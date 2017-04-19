import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TextStep.styles';

const notification = require('../assets/notification.mp3');

class TextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { audio, delay } = this.props;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (audio) {
          const audioPlayer = new Audio(notification);
          audioPlayer.play();
        }
        this.props.triggerNextStep();
      });
    }, delay);
  }

  render() {
    const {
      avatar,
      user,
      bubbleColor,
      fontColor,
      isFirst,
      isLast,
      previousValue,
    } = this.props;
    let { message } = this.props;

    const loadingStyle = Object.assign({}, styles.loading);
    const loading2Style = Object.assign({}, styles.loading, styles.loading2);
    const loading3Style = Object.assign({}, styles.loading, styles.loading3);

    message = message.replace(/{previousValue}/g, previousValue);

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
          { !this.state.loading && message }
        </div>
      </div>
    );
  }
}

TextStep.propTypes = {
  avatar: PropTypes.string.isRequired,
  audio: PropTypes.bool.isRequired,
  bubbleColor: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  fontColor: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  previousValue: PropTypes.any,
  user: PropTypes.bool,
};

TextStep.defaultProps = {
  previousValue: '',
  user: false,
};

export default TextStep;
