import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';
import CustomStepContainer from './CustomStepContainer';
import Image from '../text/Image';
import ImageContainer from '../text/ImageContainer';
import TextStepContainer from '../text/TextStepContainer';

class CustomStep extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { speak, step, previousValue, triggerNextStep, emulateSubmitUserMessage } = this.props;
    const { delay, waitAction } = step;

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (!waitAction && !step.rendered) {
          triggerNextStep();
        }
        speak(step, previousValue);
      });
    }, delay);
  }

  renderComponent = () => {
    const { step, steps, previousStep, triggerNextStep, emulateSubmitUserMessage } = this.props;
    const { component } = step;

    return React.cloneElement(component, {
      step,
      steps,
      previousStep,
      triggerNextStep,
      emulateSubmitUserMessage
    });
  };

  render() {
    const { loading } = this.state;
    const { style, step, avatarStyle, hideBotAvatar, hideUserAvatar, hideAvatar } = this.props;
    const { avatar, user } = step;

    const showAvatar = !hideBotAvatar && !hideAvatar;

    return (
      <CustomStepContainer className="rsc-cs" style={style}>
        <ImageContainer className="rsc-ts-image-container" user={user}>
          {showAvatar && (
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
        {loading ? <Loading /> : this.renderComponent()}
      </CustomStepContainer>
    );
  }
}

CustomStep.propTypes = {
  previousStep: PropTypes.objectOf(PropTypes.any).isRequired,
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  speak: PropTypes.func,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  steps: PropTypes.objectOf(PropTypes.any).isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  emulateSubmitUserMessage: PropTypes.func.isRequired,
  avatarStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  hideAvatar: PropTypes.bool.isRequired
};
CustomStep.defaultProps = {
  previousValue: '',
  speak: () => {},
  hideAvatar: false
};

export default CustomStep;
