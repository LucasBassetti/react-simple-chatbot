import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

class TextStep extends Component {
  /* istanbul ignore next */
  state = {
    loading: true
  };

  componentDidMount() {
    const { step, speak, previousValue, triggerNextStep } = this.props;
    const { component, delay, waitAction } = step;
    const isComponentWatingUser = component && waitAction;

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!isComponentWatingUser && !step.rendered) {
          triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  getMessage = () => {
    const { previousValue, step, previousSteps } = this.props;
    let { message } = step;
    message = message ? message.replace(/{previousValue}/g, previousValue) : '';

    message = this.replaceAllVariables(message, previousSteps);

    return message;
  };

  replaceAllVariables = (message, steps) => {
    const variables = message.match(/{[^{}]+}/g);
    if (variables) {
      for (let variable of variables) {
        if (steps[variable]) {
          message = message.replace(new RegExp(variable, 'g'), steps[variable].value);
        }
        variable = variable.replace(/[{}]/g, '');
        if (steps[variable]) {
          message = message.replace(new RegExp(`{${variable}}`, 'g'), steps[variable].value);
        }
        const split = variable.split('.');
        const step = steps[`{${split[0]}}`];
        if (step) {
          message = message.replace(new RegExp(`{${variable}}`, 'g'), step.value[split[1]]);
        }
      }
    }
    return message;
  };

  renderMessage = () => {
    const { step, steps, previousStep, triggerNextStep } = this.props;
    const { component } = step;

    if (component) {
      return React.cloneElement(component, {
        step,
        steps,
        previousStep,
        triggerNextStep
      });
    }

    return this.getMessage();
  };

  render() {
    const {
      step,
      isFirst,
      isLast,
      avatarStyle,
      bubbleStyle,
      hideBotAvatar,
      hideUserAvatar
    } = this.props;
    const { loading } = this.state;
    const { avatar, user, metadata } = step;

    const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

    return (
      <TextStepContainer className={`rsc-ts ${user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} user={user}>
        <ImageContainer className="rsc-ts-image-container" user={user}>
          {isFirst && showAvatar && (
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
          title={metadata && metadata.timestamp}
        >
          {loading ? <Loading /> : this.renderMessage()}
        </Bubble>
      </TextStepContainer>
    );
  }
}

TextStep.propTypes = {
  avatarStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  bubbleStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  previousStep: PropTypes.objectOf(PropTypes.any),
  previousSteps: PropTypes.objectOf(PropTypes.any),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  speak: PropTypes.func,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  steps: PropTypes.objectOf(PropTypes.any),
  triggerNextStep: PropTypes.func.isRequired
};

TextStep.defaultProps = {
  previousStep: {},
  previousSteps: {},
  previousValue: '',
  speak: () => {},
  steps: {}
};

export default TextStep;
