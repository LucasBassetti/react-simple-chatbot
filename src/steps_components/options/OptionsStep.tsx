import React, { useRef, type CSSProperties } from 'react';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';
import type { ChatStep, TriggerNextStepData } from '../../types';

export interface OptionsStepProps {
  step: ChatStep;
  bubbleOptionStyle: CSSProperties;
  triggerNextStep: (data?: TriggerNextStepData) => void;
}

const OptionsStep = ({ step, bubbleOptionStyle, triggerNextStep }: OptionsStepProps) => {
  const clickedRef = useRef(false);
  const { options = [] } = step;

  const onOptionClick = (value: unknown) => {
    // ignore double clicks, the step is replaced by the chosen option
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    triggerNextStep({ value });
  };

  return (
    <OptionsStepContainer className="rsc-os">
      <Options className="rsc-os-options">
        {options.map(({ value, label }) => (
          <Option key={String(value)} className="rsc-os-option">
            <OptionElement
              type="button"
              className="rsc-os-option-element"
              style={bubbleOptionStyle}
              onClick={() => onOptionClick(value)}
            >
              {label}
            </OptionElement>
          </Option>
        ))}
      </Options>
    </OptionsStepContainer>
  );
};

export default OptionsStep;
