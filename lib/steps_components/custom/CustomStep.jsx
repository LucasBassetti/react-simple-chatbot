import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

class CustomStep extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { speak, step, previousValue } = this.props;
    const { delay, waitAction } = step;

    this.timeout = setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitAction && !step.rendered) {
          this.triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  // a step can only trigger the next step once, even if the component is
  // mounted twice (React.StrictMode) or calls triggerNextStep more than once
  triggerNextStep = data => {
    const { triggerNextStep } = this.props;
    if (this.triggered) {
      return;
    }
    this.triggered = true;
    triggerNextStep(data);
  };

  renderComponent = () => {
    const { step, steps, previousStep } = this.props;
    const { component } = step;

    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep: this.triggerNextStep
    });
  };

  render() {
    const { loading } = this.state;
    const { style } = this.props;

    return (
      <CustomStepContainer className="rsc-cs" style={style}>
        {loading ? <Loading /> : this.renderComponent()}
      </CustomStepContainer>
    );
  }
}

CustomStep.propTypes = {
  previousStep: PropTypes.objectOf(PropTypes.any).isRequired,
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  speak: PropTypes.func,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  steps: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};
CustomStep.defaultProps = {
  previousValue: '',
  speak: () => {}
};

export default CustomStep;
