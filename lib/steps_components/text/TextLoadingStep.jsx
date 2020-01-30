import React from 'react';
import PropTypes from 'prop-types';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';

function TextLoadingStep(props) {
  const { avatarStyle, bubbleStyle, hideBotAvatar, hideUserAvatar, avatar, user } = props;

  const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;

  return (
    <TextStepContainer className={`rsc-ts ${user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} user={user}>
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
      <Bubble
        className="rsc-ts-bubble"
        style={bubbleStyle}
        user={user}
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
  hideBotAvatar: PropTypes.bool.isRequired,
  hideUserAvatar: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  user: PropTypes.bool
};

TextLoadingStep.defaultProps = {
  avatar: undefined,
  user: undefined
};

export default TextLoadingStep;
