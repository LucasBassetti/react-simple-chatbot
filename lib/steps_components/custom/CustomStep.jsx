import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

class CustomStep extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { speak, step, previousValue, triggerNextStep, emulateSubmitUserMessage } = this.props;
    const { delay, waitAction } = step;

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitAction && !step.rendered) {
          triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  renderComponent = () => {
    const { step, steps, previousStep, triggerNextStep, emulateSubmitUserMessage } = this.props;
    const { component } = step;

    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
      emulateSubmitUserMessage
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
  triggerNextStep: PropTypes.func.isRequired,
  emulateSubmitUserMessage: PropTypes.func.isRequired
};
CustomStep.defaultProps = {
  previousValue: '',
  speak: () => {}
};

export default CustomStep;
