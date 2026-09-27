import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import OptionsStep from '../../src/steps_components/options/OptionsStep';

const step = {
  id: '1',
  options: [
    { value: 'op1', label: 'Option 1', trigger: '2' },
    { value: 'op2', label: 'Option 2', trigger: '3' }
  ]
};

describe('OptionsStep', () => {
  it('should render the options', () => {
    const { container } = render(
      <OptionsStep step={step} bubbleOptionStyle={{}} triggerNextStep={() => {}} />
    );
    const options = container.querySelectorAll('.rsc-os-option-element');
    expect(Array.from(options).map(option => option.textContent)).toEqual(['Option 1', 'Option 2']);
  });

  it('should trigger the next step with the value of the option only once', () => {
    const triggerNextStep = vi.fn();
    render(<OptionsStep step={step} bubbleOptionStyle={{}} triggerNextStep={triggerNextStep} />);
    fireEvent.click(screen.getByText('Option 2'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(triggerNextStep).toHaveBeenCalledTimes(1);
    expect(triggerNextStep).toHaveBeenCalledWith({ value: 'op2' });
  });
});
