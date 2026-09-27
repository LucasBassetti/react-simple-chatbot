import { cloneElement, type ReactElement } from 'react';
import type { ChatStep, RenderedSteps, TriggerNextStepData } from '../../types';

interface StepComponentProps {
  step: ChatStep;
  steps: RenderedSteps;
  previousStep: Partial<ChatStep>;
  triggerNextStep: (data?: TriggerNextStepData) => void;
}

/** Render the component of a custom step with the step props */
const renderStepComponent = (component: ReactElement<any>, props: StepComponentProps) => {
  // DOM elements (e.g. <div />) don't accept the step props
  if (typeof component.type === 'string') {
    return component;
  }
  return cloneElement(component, props);
};

export default renderStepComponent;
