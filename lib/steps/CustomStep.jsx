import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomStep.styles';

class CustomStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { step } = this.props;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!step.user) {
          this.props.triggerNextStep(step);
        }
      });
    }, 500);
  }

  renderComponent() {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step;
    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
    });
  }

  render() {
    const { loading } = this.state;
    const { style } = this.props;
    const customStyle = Object.assign(
      {},
      styles.customStep,
      style,
    );
    return (
      <div
        className="custom-step"
        style={customStyle}
      >
        { loading ? (
          <span style={styles.loading}>Loading ...</span>
        ) : this.renderComponent() }
      </div>
    );
  }
}

CustomStep.propTypes = {
  step: PropTypes.object.isRequired,
  steps: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  previousStep: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default CustomStep;
