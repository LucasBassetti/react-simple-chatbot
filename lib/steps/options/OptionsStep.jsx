import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';

class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onOptionClick({ value }) {
    this.props.triggerNextStep(value);
  }

  renderOption(option) {
    const { bubbleStyle } = this.props;
    const { bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;

    return (
      <Option
        key={value}
        className="rsc-os-option"
      >
        <OptionElement
          className="rsc-os-option-element"
          style={bubbleStyle}
          bubbleColor={bubbleColor}
          fontColor={fontColor}
          onClick={() => this.onOptionClick({ value })}
        >
          {label}
        </OptionElement>
      </Option>
    );
  }

  render() {
    const { options } = this.props.step;

    return (
      <OptionsStepContainer className="rsc-os">
        <Options className="rsc-os-options">
          {_.map(options, this.renderOption)}
        </Options>
      </OptionsStepContainer>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
};

export default OptionsStep;
