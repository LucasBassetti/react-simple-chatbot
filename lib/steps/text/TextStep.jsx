import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from './Loading';
import TextStepContainer from './TextStepContainer';

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

    return (
      <TextStepContainer
        className="rsc-ts"
        user={user}
      >
        <ImageContainer
          className="rsc-ts-image-container"
          user={user}
        >
          {
            isFirst &&
            <Image
              className="rsc-ts-image"
              user={user}
              src={avatar}
              alt="avatar"
            />
          }
        </ImageContainer>
        <Bubble
          className="rsc-ts-bubble"
          user={user}
          bubbleColor={bubbleColor}
          fontColor={fontColor}
          isFirst={isFirst}
          isLast={isLast}
        >
          {
            this.state.loading &&
            <span className="rsc-ts-loading">
              <Loading delay="0s">.</Loading>
              <Loading delay=".2s">.</Loading>
              <Loading delay=".4s">.</Loading>
            </span>
          }
          { !this.state.loading && this.renderMessage() }
        </Bubble>
      </TextStepContainer>
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
