import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class LinkHandler extends Component {
  componentWillMount() {
    const { steps, triggerNextStep } = this.props;

    const link = steps.option.value;
    this.props.handleLink(link);
    document.querySelector('.tutorial .rsc-header a').click();
    document.querySelector(`.sub-links a[data-href="${link}"]`).click();
    document.body.scrollTop = 0;

    setTimeout(() => {
      triggerNextStep();
    }, 500);
  }

  render() {
    return <span />;
  }
}

LinkHandler.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
  handleLink: PropTypes.func.isRequired,
};

LinkHandler.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd() {
    setTimeout(() => {
      document.querySelector('.tutorial .rsc-header a').click();

      setTimeout(() => {
        this.setState({ loading: true }, () => {
          this.setState({ loading: false });
        });
      }, 500);
    }, 2000);
  }

  render() {
    const { loading } = this.state;
    const mobile = window.innerWidth < 568;
    const triggerMobile = mobile ? 'mobile-step' : 'result';

    if (loading) {
      return <span />;
    }

    return (
      <ChatBot
        className="tutorial"
        customStyle={{ display: 'none' }}
        hideUserAvatar={true}
        floating={true}
        handleEnd={this.handleEnd}
        headerTitle="RSC Support"
        steps={[
          {
            id: '1',
            message: 'Hi! Do you need some help?',
            trigger: '2',
          },
          {
            id: '2',
            options: [
              { value: 'yes', label: 'Yes', trigger: '3' },
            ],
          },
          {
            id: '3',
            message: 'Great!',
            trigger: '4',
          },
          {
            id: '4',
            message: 'React Simple Chatbot is a react lib to create simple conversation chats',
            trigger: '5',
          },
          {
            id: '5',
            message: 'You can find more details in this documenation. Let\'s make a tour',
            trigger: 'screen-question',
          },
          {
            id: 'screen-question',
            message: 'What screen would you like to see?',
            trigger: 'option',
          },
          {
            id: 'option',
            options: [
              { value: '/docs/installation', label: 'Installation', trigger: 'option-selected' },
              { value: '/docs/bmi', label: 'Examples', trigger: 'option-selected' },
              { value: '/docs/chatbot', label: 'API', trigger: 'option-selected' },
            ],
          },
          {
            id: 'option-selected',
            message: 'I will redirect you to the screen',
            trigger: triggerMobile,
          },
          {
            id: 'mobile-step',
            message: 'Please close the chat',
            trigger: 'result',
          },
          {
            id: 'result',
            replace: true,
            component: (
              <LinkHandler
                handleLink={this.props.handleLink}
              />
            ),
            trigger: 'finish-question',
          },
          {
            id: 'finish-question',
            message: 'Do you like to see another screen?',
            trigger: 'question-result',
          },
          {
            id: 'question-result',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'screen-question' },
              { value: 'no', label: 'No, thanks', trigger: 'finish' },
            ],
          },
          {
            id: 'finish',
            message: 'Please Star the project if you like it! Thanks! :)',
            end: true,
          },
        ]}
      />
    );
  }
}

Tutorial.propTypes = {
  handleLink: PropTypes.func.isRequired,
};

export default Tutorial;
