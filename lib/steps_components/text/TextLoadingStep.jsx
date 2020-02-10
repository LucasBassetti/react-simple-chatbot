import React from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

function TextLoadingStep(props) {
  const { avatarStyle, bubbleStyle, avatar } = props;

  const showAvatar = true;

  return (
    <TextStepContainer className="rsc-ts rsc-ts-bot" user={false}>
      <ImageContainer className="rsc-ts-image-container" user={false}>
        {showAvatar && (
          <Image
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
        className="rsc-ts-bubble"
        style={bubbleStyle}
        user={false}
        showAvatar={showAvatar}
        isFirst
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
  avatar: PropTypes.string
};

TextLoadingStep.defaultProps = {
  avatar: undefined
};

export default TextLoadingStep;
