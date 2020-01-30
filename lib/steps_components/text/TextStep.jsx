import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import {
  isNestedVariable,
  splitByFirstPeriod,
  makeVariable,
  getFromObjectByPath
} from '../../utils';

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
        if (steps[variable] || steps[makeVariable(splitByFirstPeriod(variable)[0])]) {
          message = message.replace(new RegExp(variable, 'g'), this.getValue(steps, variable));
        } else {
          variable = variable.replace(/[{}]/g, '');
          if (steps[variable] || steps[splitByFirstPeriod(variable)[0]]) {
            message = message.replace(
              new RegExp(`{${variable}}`, 'g'),
              this.getValue(steps, variable)
            );
          }
        }
      }
    }
    return message;
  };

  getValue = (steps, variable) => {
    let value;

    if (isNestedVariable(variable)) {
      const [parentVariableName, remainingPath] = splitByFirstPeriod(variable);
      const parentVariable = makeVariable(parentVariableName);
      if (steps[parentVariable] && steps[parentVariable].value) {
        value = getFromObjectByPath(steps[parentVariable].value, remainingPath);
      }
    } else {
      // eslint-disable-next-line prefer-destructuring
      value = steps[variable].value;
    }

    if (typeof value === 'object') {
      return JSON.stringify(value, null, 1)
        .replace(/{/g, '(')
        .replace(/}/g, ')');
    }

    const defaultValue = /\d+\..+\..+-.+\..+/;
    if (typeof value === 'string' && value.match(defaultValue)) return '';

    return value;
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
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading ? (
            <Loading />
          ) : step.component ? (
            this.renderMessage()
          ) : (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: this.renderMessage() }} />
          )}
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
