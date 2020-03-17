import React from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

function TextLoadingStep(props) {
  const { avatarStyle, bubbleStyle, avatar, animated, showAvatar } = props;

  return (
    <TextStepContainer className="rsc-ts rsc-ts-bot" user={false}>
      <ImageContainer className="rsc-ts-image-container" user={false}>
        {showAvatar && (
          <Image
            animated={animated}
            className="rsc-ts-image"
            style={avatarStyle}
            showAvatar={showAvatar}
            user={false}
            src={avatar}
            alt="avatar"
          />
        )}
      </ImageContainer>
      <Bubble
        animated={animated}
        className="rsc-ts-bubble"
        style={bubbleStyle}
        user={false}
        showAvatar
        isFirst={showAvatar}
        isLast={!showAvatar}
        title="..."
      >
        <Loading />
      </Bubble>
    </TextStepContainer>
  );
}

TextLoadingStep.propTypes = {
  avatarStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  bubbleStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  avatar: PropTypes.string,
  animated: PropTypes.bool,
  showAvatar: PropTypes.bool
};

TextLoadingStep.defaultProps = {
  avatar: undefined,
  animated: true,
  showAvatar: true
};

export default TextLoadingStep;
