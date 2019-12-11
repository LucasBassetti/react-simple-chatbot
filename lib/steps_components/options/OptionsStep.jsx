import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {
  onOptionClick = option => {
    const { triggerNextStep } = this.props;

    triggerNextStep(option);
  };

  renderOption = option => {
    const { bubbleOptionStyle, step, style } = this.props;
    const { user } = step;
    const { label } = option;

    return (
      <Option key={JSON.stringify(option)} className="rsc-os-option">
        <OptionElement
          className="rsc-os-option-element"
          style={{ ...bubbleOptionStyle, ...style }}
          user={user}
          onClick={() => this.onOptionClick(option)}
        >
          {label}
        </OptionElement>
      </Option>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = step;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {Object.keys(options)
            .map(key => options[key])
            .map(this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.defaultProps = {
  style: null
};

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string)
};

export default OptionsStep;
