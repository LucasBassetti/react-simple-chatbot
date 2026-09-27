import React, { type CSSProperties } from 'react';
import Bubble from './Bubble';
import Image from './Image';
import ImageContainer from './ImageContainer';
import Loading from '../common/Loading';
import TextStepContainer from './TextStepContainer';
import useStep from '../common/useStep';
import renderStepComponent from '../common/renderStepComponent';
import type { ChatStep, RenderedSteps, TriggerNextStepData } from '../../types';
import type { SpeakFn } from '../../speechSynthesis';

export interface TextStepProps {
  step: ChatStep;
  steps?: RenderedSteps;
  previousStep?: Partial<ChatStep>;
  previousValue?: unknown;
  speak?: SpeakFn;
  triggerNextStep: (data?: TriggerNextStepData) => void;
  avatarStyle: CSSProperties;
  bubbleStyle: CSSProperties;
  hideBotAvatar: boolean;
  hideUserAvatar: boolean;
  isFirst: boolean;
  isLast: boolean;
}

const noop = () => {};

const TextStep = ({
  step,
  steps = {},
  previousStep = {},
  previousValue = '',
  speak = noop,
  triggerNextStep,
  avatarStyle,
  bubbleStyle,
  hideBotAvatar,
  hideUserAvatar,
  isFirst,
  isLast
}: TextStepProps) => {
  const { avatar, botName, component, message, user } = step;
  const { loading, triggerNextStep: triggerNextStepOnce } = useStep({
    step,
    previousValue,
    speak,
    triggerNextStep,
    // a component rendered as message can wait the user action
    waitAction: Boolean(component && step.waitAction)
  });

  const renderMessage = () => {
    if (component) {
      return renderStepComponent(component, {
        step,
        steps,
        previousStep,
        triggerNextStep: triggerNextStepOnce
      });
    }

    return typeof message === 'string'
      ? message.replace(/{previousValue}/g, String(previousValue))
      : '';
  };

  const showAvatar = user ? !hideUserAvatar : !hideBotAvatar;
  const imageAltText = user ? 'Your avatar' : `${botName}'s avatar`;

  return (
    <TextStepContainer className={`rsc-ts ${user ? 'rsc-ts-user' : 'rsc-ts-bot'}`} $user={user}>
      <ImageContainer className="rsc-ts-image-container" $user={user}>
        {isFirst && showAvatar && (
          <Image
            className="rsc-ts-image"
            style={avatarStyle}
            $user={user}
            src={avatar}
            alt={imageAltText}
          />
        )}
      </ImageContainer>
      <Bubble
        className="rsc-ts-bubble"
        style={bubbleStyle}
        $user={user}
        $showAvatar={showAvatar}
        $isFirst={isFirst}
        $isLast={isLast}
      >
        {loading ? <Loading /> : renderMessage()}
      </Bubble>
    </TextStepContainer>
  );
};

export default TextStep;
