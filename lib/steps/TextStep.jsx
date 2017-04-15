import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TextStep.styles';

class TextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { delay } = this.props;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
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
            <span style={styles.loading}>
              ...
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
  bubbleColor: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  fontColor: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  previousValue: PropTypes.string,
  user: PropTypes.bool,
};

TextStep.defaultProps = {
  previousValue: '',
  user: false,
};

export default TextStep;
