import React, { Component, PropTypes } from 'react';

class BMI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { steps } = this.props;
    const height = steps.height.value;
    const weight = steps.weight.value;
    const bmi = Number(((weight / (height * height)) * 10000).toFixed(1));
    let result = 'Underweight';

    if (bmi >= 18.5 && bmi < 25) {
      result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      result = 'Overweight';
    } else if (bmi >= 30) {
      result = 'Obesity';
    }

    return (
      <div className="test">
        Your BIM is {bmi} ({result})
      </div>
    );
  }
}

BMI.propTypes = {
  steps: PropTypes.object,
};

BMI.defaultProps = {
  steps: undefined,
};

export default BMI;
