import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TextStep, { type TextStepProps } from '../../src/steps_components/text/TextStep';
import type { CustomComponentProps } from '../../src';

const baseProps: TextStepProps = {
  step: { id: '1', message: 'Hello', delay: 0, avatar: 'avatar.png', botName: 'Bot' },
  isFirst: true,
  isLast: true,
  hideBotAvatar: false,
  hideUserAvatar: false,
  avatarStyle: {},
  bubbleStyle: {},
  triggerNextStep: () => {}
};

const renderStep = (props: Partial<TextStepProps> = {}) =>
  render(<TextStep {...baseProps} {...props} />);

describe('TextStep', () => {
  describe('Bot text', () => {
    it('should show the loading, then the message', async () => {
      const { container } = renderStep();
      expect(container.querySelector('.rsc-loading')).not.toBeNull();
      expect(await screen.findByText('Hello')).toBeTruthy();
      expect(container.querySelector('.rsc-ts-bot')).not.toBeNull();
    });

    it('should render the avatar with the bot name', () => {
      renderStep();
      expect(screen.getByAltText("Bot's avatar")).toBeTruthy();
    });

    it('should render without avatar', () => {
      const { container } = renderStep({ isFirst: false, hideBotAvatar: true });
      expect(container.querySelector('.rsc-ts-image')).toBeNull();
    });

    it('should render a middle bubble without avatar', () => {
      const { container } = renderStep({ isFirst: false, isLast: false });
      expect(container.querySelector('.rsc-ts-image')).toBeNull();
    });

    it('should replace the previous value in the message', async () => {
      renderStep({
        step: { ...baseProps.step, message: 'Hi {previousValue}!' },
        previousValue: 'John'
      });
      expect(await screen.findByText('Hi John!')).toBeTruthy();
    });

    it('should trigger the next step once and speak after the delay', async () => {
      const triggerNextStep = vi.fn();
      const speak = vi.fn();
      renderStep({ triggerNextStep, speak, previousValue: 'value' });
      await screen.findByText('Hello');
      expect(triggerNextStep).toHaveBeenCalledTimes(1);
      expect(speak).toHaveBeenCalledWith(baseProps.step, 'value');
    });

    it('should not trigger the next step of a cached step', async () => {
      const triggerNextStep = vi.fn();
      const speak = vi.fn();
      renderStep({ step: { ...baseProps.step, rendered: true }, triggerNextStep, speak });
      await screen.findByText('Hello');
      expect(triggerNextStep).not.toHaveBeenCalled();
      expect(speak).not.toHaveBeenCalled();
    });
  });

  describe('User text', () => {
    const userStep = { ...baseProps.step, user: true };

    it('should render bubble without avatar (not first)', () => {
      const { container } = renderStep({ step: userStep, isFirst: false });
      expect(container.querySelector('.rsc-ts-image')).toBeNull();
      expect(container.querySelector('.rsc-ts-user')).not.toBeNull();
    });

    it('should render a first bubble with avatar', () => {
      renderStep({ step: userStep, isLast: false });
      expect(screen.getByAltText('Your avatar')).toBeTruthy();
    });

    it('should render without avatar', () => {
      const { container } = renderStep({ step: userStep, hideUserAvatar: true });
      expect(container.querySelector('.rsc-ts-image')).toBeNull();
    });
  });

  describe('Component text', () => {
    it('should render the component with the step props', async () => {
      const Custom = ({ step, previousStep }: CustomComponentProps) => (
        <div>
          custom {step?.id} after {previousStep?.id}
        </div>
      );
      renderStep({
        step: { id: '2', component: <Custom />, delay: 0 },
        previousStep: { id: '1' }
      });
      expect(await screen.findByText('custom 2 after 1')).toBeTruthy();
    });

    it('should wait the component to trigger the next step', async () => {
      const triggerNextStep = vi.fn();
      const Custom = ({ triggerNextStep: next }: CustomComponentProps) => (
        <button type="button" onClick={() => next?.({ value: 'ok' })}>
          next
        </button>
      );
      renderStep({
        step: { id: '1', component: <Custom />, waitAction: true, delay: 0 },
        triggerNextStep
      });
      const button = await screen.findByText('next');
      expect(triggerNextStep).not.toHaveBeenCalled();
      fireEvent.click(button);
      fireEvent.click(button);
      expect(triggerNextStep).toHaveBeenCalledTimes(1);
      expect(triggerNextStep).toHaveBeenCalledWith({ value: 'ok' });
    });
  });
});
