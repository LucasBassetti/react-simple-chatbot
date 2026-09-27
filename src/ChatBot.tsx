import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent
} from 'react';
import { CustomStep, OptionsStep, TextStep } from './steps_components';
import * as storage from './storage';
import {
  ChatBotContainer,
  Content,
  Header,
  HeaderTitle,
  HeaderIcon,
  FloatButton,
  FloatingIcon,
  Footer,
  Input,
  SubmitButton
} from './components';
import Recognition from './recognition';
import { ChatIcon, CloseIcon, SubmitIcon, MicIcon } from './icons';
import { isMobile, randomId } from './utils';
import { speakFn } from './speechSynthesis';
import {
  buildSteps,
  getHandleEndArgs,
  getRenderedStepsById,
  isFirstPosition,
  isLastPosition,
  pickStepsProps,
  resolveMessage,
  resolveTrigger,
  stepsPropsChanged,
  type BuiltSteps,
  type StepsProps
} from './conversation';
import useAutoScroll from './hooks/useAutoScroll';
import useLatest from './hooks/useLatest';
import type { ChatBotProps, ChatStep, StepId, TriggerNextStepData } from './types';

const DEFAULT_PROPS = {
  avatarStyle: {},
  botDelay: 1000,
  botName: 'The bot',
  bubbleOptionStyle: {},
  bubbleStyle: {},
  cache: false,
  cacheName: 'rsc_cache',
  className: '',
  contentStyle: {},
  customStyle: {},
  controlStyle: { position: 'absolute', right: '0', top: '0' },
  customDelay: 1000,
  enableMobileAutoFocus: false,
  enableSmoothScroll: false,
  floating: false,
  floatingIcon: <ChatIcon />,
  floatingStyle: {},
  footerStyle: {},
  headerTitle: 'Chat',
  height: '520px',
  hideBotAvatar: false,
  hideHeader: false,
  hideSubmitButton: false,
  hideUserAvatar: false,
  inputStyle: {},
  placeholder: 'Type the message ...',
  inputAttributes: {},
  recognitionEnable: false,
  recognitionLang: 'en',
  recognitionPlaceholder: 'Listening ...',
  speechSynthesis: {
    enable: false,
    lang: 'en',
    voice: null
  },
  style: {},
  submitButtonStyle: {},
  userDelay: 1000,
  width: '350px',
  botAvatar:
    "data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e",
  userAvatar:
    "data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e"
} satisfies Partial<ChatBotProps>;

type DefaultedProp = keyof typeof DEFAULT_PROPS;
type ResolvedProps = Omit<ChatBotProps, DefaultedProp> &
  Required<Pick<ChatBotProps, DefaultedProp>>;

// like defaultProps, the defaults are used for the props that are undefined
const resolveProps = (props: ChatBotProps): ResolvedProps => {
  const resolved: Record<string, unknown> = { ...DEFAULT_PROPS };
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      resolved[key] = value;
    }
  });
  return resolved as ResolvedProps;
};

interface ChatState {
  renderedSteps: ChatStep[];
  previousSteps: ChatStep[];
  currentStep: ChatStep;
  previousStep: Partial<ChatStep>;
  disabled: boolean;
  inputValue: string;
  inputInvalid: boolean;
  speaking: boolean;
}

const INITIAL_STATE: ChatState = {
  renderedSteps: [],
  previousSteps: [],
  currentStep: { id: '' },
  previousStep: {},
  disabled: true,
  inputValue: '',
  inputInvalid: false,
  speaking: false
};

// the time the validation message of an invalid input is shown
const INVALID_INPUT_TIMEOUT = 2000;

const replaceStep = (steps: ChatStep[], step: ChatStep, newStep: ChatStep) =>
  steps.map(s => (s === step ? newStep : s));

const ChatBot = (rawProps: ChatBotProps) => {
  const props = resolveProps(rawProps);
  const propsRef = useLatest(props);

  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<Recognition | null>(null);
  const builtStepsRef = useRef<(BuiltSteps & { stepsProps: StepsProps }) | null>(null);
  const invalidInputTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // the logic of the conversation reads the state synchronously (it runs in
  // timeouts and in the effects of the steps), so the state is kept in a ref too
  const [chat, setChatState] = useState<ChatState>(INITIAL_STATE);
  const chatRef = useRef(chat);
  const setChat = useCallback((update: Partial<ChatState>) => {
    chatRef.current = { ...chatRef.current, ...update };
    setChatState(chatRef.current);
  }, []);

  const [recognitionEnable] = useState(() => props.recognitionEnable && Recognition.isSupported());

  // a controlled floating chatbot (opened + toggleFloating) follows the opened prop
  const isControlled = props.toggleFloating !== undefined && props.opened !== undefined;
  const [openedState, setOpenedState] = useState(() => Boolean(props.opened) || !props.floating);
  if (isControlled && props.opened !== openedState) {
    setOpenedState(Boolean(props.opened));
  }
  const opened = isControlled ? Boolean(props.opened) : openedState;
  const openedRef = useLatest(opened);

  // a closed floating chatbot starts the conversation when it is opened
  const [started, setStarted] = useState(opened);
  if (opened && !started) {
    setStarted(true);
  }

  // the input can only be focused after it is enabled
  const [focusRequest, setFocusRequest] = useState(0);
  const requestFocus = useCallback(() => setFocusRequest(request => request + 1), []);

  useEffect(() => {
    const { enableMobileAutoFocus } = propsRef.current;
    if (focusRequest > 0 && (enableMobileAutoFocus || !isMobile())) {
      inputRef.current?.focus();
    }
  }, [focusRequest, propsRef]);

  const onContentScroll = useAutoScroll(
    contentRef,
    chat.renderedSteps.length,
    props.enableSmoothScroll
  );

  // build the steps again if the props changed since they were built, so the
  // steps that were not rendered yet use the new definitions
  const getLatestSteps = useCallback((): BuiltSteps => {
    const stepsProps = pickStepsProps(propsRef.current);
    const built = builtStepsRef.current;

    if (built && !stepsPropsChanged(built.stepsProps, stepsProps)) {
      return built;
    }

    try {
      builtStepsRef.current = { ...buildSteps(stepsProps), stepsProps };
    } catch (error) {
      if (!built) {
        throw error;
      }
      // keep the conversation working with the last valid steps
      console.error(error);
      builtStepsRef.current = { ...built, stepsProps };
    }
    return builtStepsRef.current;
  }, [propsRef]);

  const speak = useCallback(
    (step: ChatStep, previousValue?: unknown) =>
      speakFn(propsRef.current.speechSynthesis)(step, previousValue),
    [propsRef]
  );

  const triggerNextStep = useCallback(
    (data?: TriggerNextStepData) => {
      const { cache, cacheName, handleEnd } = propsRef.current;
      const { defaultUserSettings, chatSteps } = getLatestSteps();
      let { currentStep, previousStep, previousSteps, renderedSteps } = chatRef.current;
      const isEnd = currentStep.end;

      // the current step can also be in the rendered and previous steps
      const updateCurrentStep = (changes: Partial<ChatStep>) => {
        const updatedStep = { ...currentStep, ...changes };
        renderedSteps = replaceStep(renderedSteps, currentStep, updatedStep);
        previousSteps = replaceStep(previousSteps, currentStep, updatedStep);
        currentStep = updatedStep;
      };

      if (data?.value) {
        updateCurrentStep({ value: data.value });
      }
      if (data?.hideInput) {
        updateCurrentStep({ hideInput: data.hideInput });
      }
      if (data?.hideExtraControl) {
        updateCurrentStep({ hideExtraControl: data.hideExtraControl });
      }
      if (data?.trigger) {
        updateCurrentStep({ trigger: resolveTrigger(data.trigger, data.value, previousSteps) });
      }

      if (isEnd) {
        if (handleEnd) {
          handleEnd(getHandleEndArgs(previousSteps));
        }
        setChat({ currentStep, previousSteps, renderedSteps });
      } else if (currentStep.options && data) {
        const option = currentStep.options.find(o => o.value === data.value);
        if (!option) {
          return;
        }
        const trigger = resolveTrigger(option.trigger, currentStep.value, previousSteps);
        const { options, ...optionsStep } = currentStep;

        // replace the options for the chosen option as an user message
        const userStep: ChatStep = {
          ...optionsStep,
          ...option,
          ...defaultUserSettings,
          user: true,
          message: option.label,
          trigger
        };

        renderedSteps = [...renderedSteps.slice(0, -1), userStep];
        previousSteps = [...previousSteps.slice(0, -1), userStep];
        currentStep = userStep;

        setChat({ currentStep, renderedSteps, previousSteps });
      } else if (currentStep.trigger) {
        if (currentStep.replace) {
          renderedSteps = renderedSteps.slice(0, -1);
        }

        const trigger = resolveTrigger(currentStep.trigger, currentStep.value, previousSteps);
        let nextStep: ChatStep = { ...chatSteps[trigger] };

        if (nextStep.message) {
          nextStep.message = resolveMessage(nextStep.message, previousSteps);
        } else if (nextStep.update) {
          const updateStep = nextStep;
          nextStep = { ...chatSteps[updateStep.update as StepId] };

          if (nextStep.options) {
            // copy the options so the original step keeps its own triggers
            nextStep.options = nextStep.options.map(option => ({
              ...option,
              trigger: updateStep.trigger as NonNullable<ChatStep['trigger']>
            }));
          } else {
            nextStep.trigger = updateStep.trigger;
          }
        }

        nextStep.key = randomId();

        previousStep = currentStep;
        currentStep = nextStep;

        if (nextStep.user) {
          // wait the user input
          setChat({ renderedSteps, currentStep, previousStep, disabled: false });
          requestFocus();
        } else {
          renderedSteps = [...renderedSteps, nextStep];
          previousSteps = [...previousSteps, nextStep];
          setChat({ renderedSteps, previousSteps, currentStep, previousStep });
        }
      }

      if (cache) {
        const cachedData = { currentStep, previousStep, previousSteps, renderedSteps };
        setTimeout(() => storage.setData(cacheName, cachedData), 300);
      }
    },
    [getLatestSteps, propsRef, requestFocus, setChat]
  );

  const checkInvalidInput = useCallback((): boolean => {
    const { currentStep, inputValue } = chatRef.current;
    const result = currentStep.validator ? currentStep.validator(inputValue) : true;

    if (typeof result === 'boolean' && result) {
      return false;
    }

    // show the error message in the input, then give back the value
    setChat({ inputValue: result.toString(), inputInvalid: true, disabled: true });
    invalidInputTimeoutRef.current = setTimeout(() => {
      setChat({ inputValue, inputInvalid: false, disabled: false });
      requestFocus();
    }, INVALID_INPUT_TIMEOUT);

    return true;
  }, [requestFocus, setChat]);

  const submitUserMessage = useCallback(() => {
    const { currentStep, inputValue, previousSteps, renderedSteps } = chatRef.current;
    const { defaultUserSettings } = getLatestSteps();

    if (currentStep.validator && checkInvalidInput()) {
      return;
    }

    const userStep: ChatStep = {
      ...defaultUserSettings,
      ...currentStep,
      message: inputValue,
      value: inputValue
    };

    setChat({
      currentStep: userStep,
      renderedSteps: [...renderedSteps, userStep],
      previousSteps: [...previousSteps, userStep],
      disabled: true,
      inputValue: ''
    });
    inputRef.current?.blur();
  }, [checkInvalidInput, getLatestSteps, setChat]);

  // start the conversation, or restore it from the cache
  useEffect(() => {
    const { cache, cacheName, steps } = propsRef.current;
    const stepsProps = pickStepsProps(propsRef.current);
    const built = buildSteps(stepsProps);
    builtStepsRef.current = { ...built, stepsProps };

    // copy the parsed step (with defaults), so the step definition is not changed
    const firstStep: ChatStep = { ...built.chatSteps[steps[0].id], key: randomId() };
    if (typeof firstStep.message === 'function') {
      firstStep.message = firstStep.message({ previousValue: undefined, steps: {} });
    }

    let waitingUser = false;
    const data = storage.getData({ cacheName, cache, firstStep, steps: built.chatSteps }, () => {
      waitingUser = true;
    });

    setChat({ ...data, disabled: !waitingUser });
    if (waitingUser && openedRef.current) {
      requestFocus();
    }
  }, [openedRef, propsRef, requestFocus, setChat]);

  useEffect(() => {
    if (!recognitionEnable) {
      return;
    }

    recognitionRef.current = new Recognition(
      value => setChat({ inputValue: value }),
      () => {
        setChat({ speaking: false });
        // submitting an empty value would start the recognition again forever
        if (chatRef.current.inputValue) {
          submitUserMessage();
        }
      },
      () => setChat({ speaking: false }),
      propsRef.current.recognitionLang
    );
  }, [propsRef, recognitionEnable, setChat, submitUserMessage]);

  useEffect(() => () => clearTimeout(invalidInputTimeoutRef.current), []);

  const toggleChatBot = (nextOpened: boolean) => {
    if (props.toggleFloating) {
      props.toggleFloating({ opened: nextOpened });
    } else {
      setOpenedState(nextOpened);
    }
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLElement>, nextOpened: boolean) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleChatBot(nextOpened);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Enter also confirms the composition of IME (e.g. japanese) characters
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      submitUserMessage();
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChat({ inputValue: event.target.value });
  };

  const handleSubmitButton = () => {
    const { inputValue, speaking } = chatRef.current;

    if ((!inputValue || speaking) && recognitionEnable) {
      recognitionRef.current?.speak();
      if (!speaking) {
        setChat({ speaking: true });
      }
      return;
    }

    submitUserMessage();
  };

  const {
    avatarStyle,
    bubbleOptionStyle,
    bubbleStyle,
    className,
    contentStyle,
    controlStyle,
    customStyle,
    extraControl,
    floating,
    floatingIcon,
    floatingStyle,
    footerStyle,
    headerComponent,
    headerTitle,
    height,
    hideBotAvatar,
    hideHeader,
    hideSubmitButton,
    hideUserAvatar,
    inputAttributes,
    inputStyle,
    placeholder,
    recognitionPlaceholder,
    style,
    submitButtonStyle,
    width
  } = props;
  const { currentStep, disabled, inputInvalid, inputValue, renderedSteps, speaking } = chat;
  const stepsById = getRenderedStepsById(chat.previousSteps);

  const renderStep = (step: ChatStep, index: number) => {
    const { options, component, asMessage } = step;
    const previousStep: Partial<ChatStep> = index > 0 ? renderedSteps[index - 1] : {};
    const key = step.key ?? `step-${index}`;

    if (component && !asMessage) {
      return (
        <CustomStep
          key={key}
          speak={speak}
          step={step}
          steps={stepsById}
          style={customStyle}
          previousStep={previousStep}
          previousValue={previousStep.value}
          triggerNextStep={triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={key}
          step={step}
          triggerNextStep={triggerNextStep}
          bubbleOptionStyle={bubbleOptionStyle}
        />
      );
    }

    return (
      <TextStep
        key={key}
        step={step}
        steps={stepsById}
        speak={speak}
        previousStep={previousStep}
        previousValue={previousStep.value}
        triggerNextStep={triggerNextStep}
        avatarStyle={avatarStyle}
        bubbleStyle={bubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        isFirst={isFirstPosition(renderedSteps, index)}
        isLast={isLastPosition(renderedSteps, index)}
      />
    );
  };

  const header = headerComponent || (
    <Header className="rsc-header">
      <HeaderTitle className="rsc-header-title">{headerTitle}</HeaderTitle>
      {floating && (
        <HeaderIcon
          className="rsc-header-close-button"
          role="button"
          tabIndex={0}
          aria-label="Close chat"
          onClick={() => toggleChatBot(false)}
          onKeyDown={event => handleButtonKeyDown(event, false)}
        >
          <CloseIcon />
        </HeaderIcon>
      )}
    </Header>
  );

  const customControl =
    extraControl && cloneElement(extraControl, { disabled, speaking, invalid: inputInvalid });

  const showMic = (!inputValue || speaking) && recognitionEnable;
  let submitLabel = 'Send message';
  if (showMic) {
    submitLabel = speaking ? 'Stop voice input' : 'Start voice input';
  }

  const inputPlaceholder = speaking
    ? recognitionPlaceholder
    : currentStep.placeholder || placeholder;

  const inputAttributesOverride = currentStep.inputAttributes || inputAttributes;

  return (
    <div className={`rsc ${className}`}>
      {floating && (
        <FloatButton
          className="rsc-float-button"
          style={floatingStyle}
          $opened={opened}
          role="button"
          tabIndex={opened ? -1 : 0}
          aria-label="Open chat"
          aria-hidden={opened}
          onClick={() => toggleChatBot(true)}
          onKeyDown={event => handleButtonKeyDown(event, true)}
        >
          {typeof floatingIcon === 'string' ? (
            <FloatingIcon src={floatingIcon} alt="" />
          ) : (
            floatingIcon
          )}
        </FloatButton>
      )}
      <ChatBotContainer
        className="rsc-container"
        $floating={floating}
        $floatingStyle={floatingStyle}
        $opened={opened}
        style={style}
        $width={width}
        $height={height}
      >
        {!hideHeader && header}
        <Content
          className="rsc-content"
          ref={contentRef}
          onScroll={onContentScroll}
          $floating={floating}
          style={contentStyle}
          $height={height}
          $hideInput={currentStep.hideInput}
        >
          {started && renderedSteps.map(renderStep)}
        </Content>
        <Footer className="rsc-footer" style={footerStyle}>
          {!currentStep.hideInput && (
            <Input
              type="text"
              aria-label={inputPlaceholder || 'Type the message'}
              style={inputStyle}
              ref={inputRef}
              className="rsc-input"
              placeholder={inputInvalid ? '' : inputPlaceholder}
              onKeyDown={handleInputKeyDown}
              onChange={handleInputChange}
              value={inputValue}
              $floating={floating}
              $invalid={inputInvalid}
              disabled={disabled}
              $hasButton={!hideSubmitButton}
              {...inputAttributesOverride}
            />
          )}
          <div style={controlStyle} className="rsc-controls">
            {!currentStep.hideInput && !currentStep.hideExtraControl && customControl}
            {!currentStep.hideInput && !hideSubmitButton && (
              <SubmitButton
                type="button"
                aria-label={submitLabel}
                className="rsc-submit-button"
                style={submitButtonStyle}
                onClick={handleSubmitButton}
                $invalid={inputInvalid}
                disabled={disabled}
                $speaking={speaking}
              >
                {showMic ? <MicIcon /> : <SubmitIcon />}
              </SubmitButton>
            )}
          </div>
        </Footer>
      </ChatBotContainer>
    </div>
  );
};

export default ChatBot;
