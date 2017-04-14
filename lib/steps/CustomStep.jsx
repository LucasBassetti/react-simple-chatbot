import React, { Component, PropTypes } from 'react';
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
    return (
      <div
        className="custom-step"
        style={styles.customStep}
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
  previousStep: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default CustomStep;
