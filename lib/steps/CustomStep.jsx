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
    const customStyle = Object.assign(
      {},
      styles.customStep,
      style,
    );
    const loadingStyle = Object.assign({}, styles.loading);
    const loading2Style = Object.assign({}, styles.loading, styles.loading2);
    const loading3Style = Object.assign({}, styles.loading, styles.loading3);

    return (
      <div
        className="custom-step"
        style={customStyle}
      >
        { loading ? (
          <span>
            <span style={loadingStyle}>.</span>
            <span style={loading2Style}>.</span>
            <span style={loading3Style}>.</span>
          </span>
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
