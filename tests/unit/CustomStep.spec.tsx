import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomStep, { type CustomStepProps } from '../../src/steps_components/custom/CustomStep';

const Example = () => <div className="example">Example</div>;

const baseProps: CustomStepProps = {
  step: { id: '1', component: <Example />, delay: 0 },
  steps: {},
  previousStep: {},
  style: { border: 0 },
  triggerNextStep: () => {}
};

describe('CustomStep', () => {
  describe('Without wait user', () => {
    it('should render the component with the style', async () => {
      const { container } = render(<CustomStep {...baseProps} />);
      expect(await screen.findByText('Example')).toBeTruthy();
      const stepContainer = container.querySelector('.rsc-cs') as HTMLElement;
      expect(stepContainer.style.border).toBe('0px');
    });

    it('should trigger the next step', async () => {
      const triggerNextStep = vi.fn();
      render(<CustomStep {...baseProps} triggerNextStep={triggerNextStep} />);
      await screen.findByText('Example');
      expect(triggerNextStep).toHaveBeenCalledTimes(1);
    });
  });

  describe('With wait user', () => {
    it('should not trigger the next step', async () => {
      const triggerNextStep = vi.fn();
      render(
        <CustomStep
          {...baseProps}
          step={{ ...baseProps.step, waitAction: true }}
          triggerNextStep={triggerNextStep}
        />
      );
      expect(await screen.findByText('Example')).toBeTruthy();
      expect(triggerNextStep).not.toHaveBeenCalled();
    });
  });
});
