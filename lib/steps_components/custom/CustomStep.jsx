import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';

class CustomStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    const { speak, step, previousValue } = this.props;
    const { delay, waitAction } = step;

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitAction && !step.rendered) {
          this.props.triggerNextStep();
        }
        speak(step, previousValue);
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
      <CustomStepContainer className="rsc-cs" style={style}>
        {loading ? <Loading /> : this.renderComponent()}
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
  previousValue: PropTypes.any,
  speak: PropTypes.func,
};
CustomStep.defaultProps = {
  previousValue: '',
  speak: _.noop,
};

export default CustomStep;
