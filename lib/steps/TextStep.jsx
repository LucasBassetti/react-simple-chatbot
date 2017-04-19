import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TextStep.styles';

class TextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { step } = this.props;
    const { component, delay, waitUser } = step;
    const isComponentWatingUser = component && waitUser;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!isComponentWatingUser) {
          this.props.triggerNextStep();
        }
      });
    }, delay);
  }

  renderMessage() {
    const { previousValue, step } = this.props;
    const { component } = step;
    let { message } = step;

    if (component) {
      const { steps, previousStep, triggerNextStep } = this.props;
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep,
      });
    }

    message = message.replace(/{previousValue}/g, previousValue);

    return message;
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
    } = this.props;
    const {
      avatar,
      bubbleColor,
      fontColor,
      user,
    } = step;

    const loadingStyle = Object.assign({}, styles.loading);
    const loading2Style = Object.assign({}, styles.loading, styles.loading2);
    const loading3Style = Object.assign({}, styles.loading, styles.loading3);

    let chatTextStepStyle = styles.chatTextStep;
    let chatImageStyle = styles.chatImage;
    let imageStyle = styles.image;
    let chatContentStyle = styles.chatContent;

    let chatContentPositionStyle = (!isFirst && !isLast) ? styles.middle : {};

    if (!isFirst && isLast) {
      chatContentPositionStyle = styles.last;
    }

    if (user) {
      chatContentPositionStyle = (!isFirst && !isLast) ? styles.userMiddle : {};

      if (!isFirst && isLast) {
        chatContentPositionStyle = styles.userLast;
      }

      chatTextStepStyle = Object.assign({}, styles.chatTextStep, styles.userChatTextStep);
      chatImageStyle = Object.assign({}, styles.chatImage, styles.userChatImage);
      imageStyle = Object.assign({}, styles.image, styles.userImage);
      chatContentStyle = Object.assign(
        {},
        styles.chatContent,
        styles.userChatContent,
        chatContentPositionStyle,
        {
          background: bubbleColor,
          color: fontColor,
        },
      );
    } else {
      chatContentStyle = Object.assign(
        {},
        styles.chatContent,
        chatContentPositionStyle,
        {
          background: bubbleColor,
          color: fontColor,
        },
      );
    }

    return (
      <div
        className="chat-text-step"
        style={chatTextStepStyle}
      >
        <div
          className="chat-image"
          style={chatImageStyle}
        >
          {
            isFirst &&
            <img
              className="image"
              style={imageStyle}
              src={avatar}
              alt="avatar"
            />
          }
        </div>
        <div
          className="chat-content"
          style={chatContentStyle}
        >
          {
            this.state.loading &&
            <span>
              <span style={loadingStyle}>.</span>
              <span style={loading2Style}>.</span>
              <span style={loading3Style}>.</span>
            </span>
          }
          { !this.state.loading && this.renderMessage() }
        </div>
      </div>
    );
  }
}

TextStep.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object,
};

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: '',
};

export default TextStep;
