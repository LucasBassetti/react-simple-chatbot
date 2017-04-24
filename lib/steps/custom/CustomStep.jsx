import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import CustomStepContainer from './CustomStepContainer';

class CustomStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { delay, waitUser } = this.props.step;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitUser) {
          this.props.triggerNextStep();
        }
      });
    }, delay);
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

    return (
      <CustomStepContainer
        className="rsc-cs"
        style={style}
      >
        { loading ? (
          <span className="rsc-cs-loading">
            <Loading delay="0s">.</Loading>
            <Loading delay=".2s">.</Loading>
            <Loading delay=".4s">.</Loading>
          </span>
        ) : this.renderComponent() }
      </CustomStepContainer>
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
