/* eslint-disable no-restricted-globals */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from '../../lib/index';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bondname: '',
      gender: '',
      age: ''
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { bondname, gender, age } = steps;

    this.setState({ bondname, gender, age });
  }

  render() {
    const { bondname, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{bondname.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};
const conditionalMessaging = value => {
  // eslint-disable-next-line no-console

  if (value === 'LKOR') {
    this.setState({
      bondname:
        'Ok. I can create your order for FlexShares Credit-Scored U.S. Long Corporate Bond Index Fund (LKOR).'
    });
  } else if (value === 'SPDR') {
    this.setState({
      bondname: 'Ok. I can create your order for Portfolio Long Term Corporate Bond ETF (SPLB).'
    });
  }
};

class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bondname: ''
    };
  }

  componentWillMount() {
    // const { steps } = this.props;
    // const { bondname } = steps;
    // this.setState({ bondname });
  }

  render() {
    const { bondname } = this.state;

    return (
      <ChatBot
        floating
        floatingStyle={{
          background: '#5AA64E',
          bottom: '32px',
          right: '32px',
          transformOrigin: 'bottom right'
        }}
        // opened={opened}
        toggleFloating={this.toggleFloating}
        steps={[
          {
            id: '1',
            message:
              'Welcome, Arianna. I see that you are placing an order for a corporate bond. Would you like help with that?',
            trigger: 'welcome'
          },
          {
            id: 'welcome',
            options: [
              { value: 'yes', label: 'Yes', trigger: '3' },
              { value: 'no', label: 'No', trigger: 'no-case' }
            ]
          },
          {
            id: '3',
            message:
              "Ok. Let me see how I can help. What is the name of the bond you're trying to purchase?",
            trigger: 'bondname'
          },
          {
            id: 'bondname',
            user: true,
            trigger: 'bond',
            validator: value => {
              return true;
            }
          },
          {
            id: 'bond',
            message:
              'Ok. I can create your order for FlexShares Credit-Scored U.S. Long Corporate Bond Index Fund (LKOR). Would you like to place your order now, or know more?',
            trigger: '4'
          },
          {
            id: '4',
            options: [
              { value: 'now', label: 'Place Order', trigger: '5' },
              { value: 'more', label: 'Learn More', trigger: 'amount' }
            ]
          },
          {
            id: 'amount',
            message: 'The price of LKOR was 60.62USD when MARKET CLOSED (FEB 27 14:53 UTC-5).',
            trigger: '4'
          },
          {
            id: '5',
            message: 'How many bonds would you like to buy?',
            trigger: 'value'
          },
          {
            id: 'value',
            user: true,
            trigger: 'purchase',
            validator: value => {
              return true;
            }
          },
          {
            id: 'purchase',
            message: "I'm ready to place your order for 5 LKOR bonds. The total will be $303.10.",
            trigger: 'last'
          },
          {
            id: 'last',
            options: [
              { value: 'place', label: 'OK', trigger: 'end-message' },
              { value: 'cancel', label: 'Cancel', trigger: 'cancel' }
            ]
          },
          {
            id: 'cancel',
            message: 'Ok. I cancelled that order.',
            end: true
          },
          {
            id: 'end-message',
            message:
              'Thanks! Your order was submitted successfully! Your confirmation number is XR6547.',
            end: true
          },
          {
            id: 'no-case',
            message: 'Ok, thanks for stopping by to chat!',
            end: true
          }
        ]}
      />
    );
  }
}
SimpleForm.propTypes = {
  steps: PropTypes.object
};

SimpleForm.defaultProps = {
  steps: undefined
};
export default SimpleForm;
