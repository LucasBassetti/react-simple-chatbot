import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

class TextStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { step, speak, previousValue } = this.props;
    const { component, delay, waitAction } = step;
    const isComponentWatingUser = component && waitAction;
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!isComponentWatingUser && !step.rendered) {
          this.props.triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  getMessage() {
    const { previousValue, step } = this.props;
    const { message } = step;

    return message.replace(/{previousValue}/g, previousValue);
  }

  renderMessage() {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step;

    if (component) {
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep,
      });
    }

    return this.getMessage();
  }

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar,
    } = this.props;
    const { avatar, user } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
      <TextStepContainer className="rsc-ts" user={user}>
        <ImageContainer className="rsc-ts-image-container" user={user}>
          {isFirst &&
            showAvatar && (
              <Image
                className="rsc-ts-image"
                style={avatarStyle}
                showAvatar={showAvatar}
                user={user}
                src={avatar}
                alt="avatar"
              />
            )}
        </ImageContainer>
        <Bubble
          className="rsc-ts-bubble"
          style={bubbleStyle}
          user={user}
          showAvatar={showAvatar}
          isFirst={isFirst}
          isLast={isLast}
        >
          {this.state.loading && <Loading />}
          {!this.state.loading && this.renderMessage()}
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
  speak: PropTypes.func,
  avatarStyle: PropTypes.object.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.object,
  previousValue: PropTypes.any,
  steps: PropTypes.object,
};

TextStep.defaultProps = {
  previousStep: {},
  steps: {},
  previousValue: '',
  speak: _.noop,
};

export default TextStep;
