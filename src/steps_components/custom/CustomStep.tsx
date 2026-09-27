import React, { type CSSProperties } from 'react';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';
import useStep from '../common/useStep';
import renderStepComponent from '../common/renderStepComponent';
import type { ChatStep, RenderedSteps, TriggerNextStepData } from '../../types';
import type { SpeakFn } from '../../speechSynthesis';

export interface CustomStepProps {
  step: ChatStep;
  steps: RenderedSteps;
  previousStep: Partial<ChatStep>;
  previousValue?: unknown;
  speak?: SpeakFn;
  style: CSSProperties;
  triggerNextStep: (data?: TriggerNextStepData) => void;
}

const noop = () => {};

const CustomStep = ({
  step,
  steps,
  previousStep,
  previousValue = '',
  speak = noop,
  style,
  triggerNextStep
}: CustomStepProps) => {
  const { loading, triggerNextStep: triggerNextStepOnce } = useStep({
    step,
    previousValue,
    speak,
    triggerNextStep,
    waitAction: step.waitAction
  });

  return (
    <CustomStepContainer className="rsc-cs" style={style}>
      {loading || !step.component ? (
        <Loading />
      ) : (
        renderStepComponent(step.component, {
          step,
          steps,
          previousStep,
          triggerNextStep: triggerNextStepOnce
        })
      )}
    </CustomStepContainer>
  );
};

export default CustomStep;
