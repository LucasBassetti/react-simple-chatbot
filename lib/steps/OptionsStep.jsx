import React, { Component, PropTypes } from 'react';
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
    const { bubbleColor, fontColor } = this.props;
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
    const { options } = this.props;

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
  options: PropTypes.array.isRequired,
  bubbleColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default OptionsStep;
