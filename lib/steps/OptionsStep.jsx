import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './OptionsStep.styles';

class OptionsStep extends Component {
  constructor(props) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onOptionClick({ value }) {
    this.props.triggerNextStep(value);
  }

  renderOption(option) {
    const { bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;

    const optionElementStyle = Object.assign(
      {},
      styles.optionElement,
      {
        background: bubbleColor,
        color: fontColor,
      },
    );

    return (
      <li
        key={value}
        className="option hover-element"
        style={styles.option}
      >
        <a
          className="option-element"
          style={optionElementStyle}
          onClick={() => this.onOptionClick({ value })}
        >
          {label}
        </a>
      </li>
    );
  }

  render() {
    const { options } = this.props.step;

    return (
      <div className="chat-options-step">
        <ul
          className="options"
          style={styles.options}
        >
          {_.map(options, this.renderOption)}
        </ul>
      </div>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default OptionsStep;
