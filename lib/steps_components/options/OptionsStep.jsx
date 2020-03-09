import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import OptionElement from './OptionElement';
import Options from './Options';
import OptionsStepContainer from './OptionsStepContainer';
import {
  isNestedVariable,
  splitByFirstPeriod,
  makeVariable,
  getFromObjectByPath
} from '../../utils';

class OptionsStep extends Component {
  state = {
    disabled: false
  };

  onOptionClick = option => {
    const { triggerNextStep } = this.props;
    const { disabled } = this.state;

    this.setState({ disabled: true });

    if (disabled) {
      return;
    }

    triggerNextStep(option);
  };

  replaceAllVariables = (message, steps) => {
    const variables = message.match(/{[^{}]+}/g);
    if (variables) {
      for (let variable of variables) {
        if (steps[variable] || steps[makeVariable(splitByFirstPeriod(variable)[0])]) {
          message = message.replace(new RegExp(variable, 'g'), this.getValue(steps, variable));
        } else {
          variable = variable.replace(/[{}]/g, '');
          if (steps[variable] || steps[splitByFirstPeriod(variable)[0]]) {
            message = message.replace(
              new RegExp(`{${variable}}`, 'g'),
              this.getValue(steps, variable)
            );
          }
        }
      }
    }
    return message;
  };

  getValue = (steps, variable) => {
    let value;

    if (isNestedVariable(variable)) {
      const [parentVariableName, remainingPath] = splitByFirstPeriod(variable);
      const parentVariable = makeVariable(parentVariableName);
      if (steps[parentVariable] && steps[parentVariable].value) {
        value = getFromObjectByPath(steps[parentVariable].value, remainingPath);
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      value = steps[variable].value;
    }

    if (typeof value === 'object') {
      return JSON.stringify(value, null, 1)
        .replace(/{/g, '(')
        .replace(/}/g, ')');
    }

    const defaultValue = /\d+\..+\..+-.+\..+/;
    if (typeof value === 'string' && value.match(defaultValue)) return '';

    return value;
  };

  renderOption = option => {
    const { bubbleOptionStyle, step, style, previousSteps } = this.props;
    const { user } = step;
    let { label } = option;

    label = this.replaceAllVariables(label, previousSteps);

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
  style: null,
  previousSteps: {}
};

OptionsStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  previousSteps: PropTypes.objectOf(PropTypes.any)
};

export default OptionsStep;
