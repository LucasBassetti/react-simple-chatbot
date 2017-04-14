import React, { Component } from 'react';
import ChatBot from './ChatBot';
import BMI from './BMI';

class App extends Component {
  constructor(props) {
    super(props);

    function validator(value) {
      if (isNaN(value)) {
        return 'value should be a number';
      } else if (value < 0) {
        return 'value should be positive';
      }

      return true;
    }

    this.state = {
      loading: false,
      steps: [
        {
          id: '0',
          message: 'Welcome to react chatbot!',
          trigger: '7',
        },
        {
          id: '1',
          message: 'What\'s your name?',
          trigger: '2',
        },
        {
          id: '2',
          user: true,
          type: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Hi {previousValue}! What\'s your gender?',
          trigger: '4',
        },
        {
          id: '4',
          options: [
            { value: 'male', label: 'Male', trigger: '5' },
            { value: 'female', label: 'Female', trigger: '5' },
          ],
        },
        {
          id: '5',
          message: 'Would you use this chatbot?',
          trigger: '6',
        },
        {
          id: '6',
          options: [
            { value: 'yes', label: 'Yes, sure!', trigger: 'yes' },
            { value: 'maybe', label: 'Maybe', trigger: 'maybe' },
            { value: 'no', label: 'No, sorry.', trigger: 'no' },
          ],
        },
        {
          id: 'yes',
          message: 'Thanks! I hope you like it! :)',
          trigger: '7',
        },
        {
          id: 'maybe',
          message: 'Come on! it\'s easy! :)',
          trigger: '7',
        },
        {
          id: 'no',
          message: 'Why? It seems cool!',
          trigger: '7',
        },
        {
          id: '7',
          message: 'Let\'s calculate your BMI (Body Mass Index)',
          trigger: '8',
        },
        {
          id: '8',
          message: 'Please type your height (cm)',
          trigger: 'height',
        },
        {
          id: 'height',
          user: true,
          type: true,
          trigger: '9',
          validator,
        },
        {
          id: '9',
          message: 'Please type your weight (kg)',
          trigger: 'weight',
        },
        {
          id: 'weight',
          user: true,
          type: true,
          trigger: '10',
          validator,
        },
        {
          id: '10',
          message: 'Thanks! Check out your BMI',
          trigger: '11',
        },
        {
          id: '11',
          component: <BMI />,
          end: true,
        },
      ],
    };

    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd(steps) {
    console.log(steps);
    // this.setState({ loading: true }, () => {
    //   setTimeout(() => {
    //     this.setState({ loading: false });
    //   }, 2000);
    // });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="app">
        {
          !loading &&
          <ChatBot
            style={{
              margin: '50px auto',
            }}
            handleEnd={this.handleEnd}
            steps={this.state.steps}
          />
        }
      </div>
    );
  }
}

export default App;
