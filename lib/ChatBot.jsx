import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Random from 'random-id';
import deepEqual from 'deep-equal';
import { CustomStep, OptionsStep, TextStep } from './steps_components';
import schema from './schemas/schema';
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
import {
  isMobile,
  isNestedVariable,
  splitByFirstPeriod,
  insertIntoObjectByPath,
  isVariable,
  makeVariable,
  deepCopy,
  getStepFromBackend
} from './utils';
import { speakFn } from './speechSynthesis';
import MultipleChoiceStep from './steps_components/multiple_choice/MultipleChoiceStep';

class ChatBot extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.content = null;
    this.input = null;

    this.supportsScrollBehavior = false;

    this.setContentRef = element => {
      this.content = element;
    };

    this.setInputRef = element => {
      this.input = element;
    };

    this.state = {
      renderedSteps: [],
      previousSteps: [],
      currentStep: {},
      previousStep: {},
      steps: {},
      disabled: true,
      opened: props.opened || !props.floating,
      inputValue: '',
      inputInvalid: false,
      speaking: false,
      recognitionEnable: props.recognitionEnable && Recognition.isSupported()
    };

    this.speak = speakFn(props.speechSynthesis);
  }

  async componentDidMount() {
    const { nextStepUrl, parseStep } = this.props;
    let { steps } = this.props;
    steps = steps || [];
    const { cache, cacheName, enableMobileAutoFocus } = this.props;
    const chatSteps = {};

    if (nextStepUrl && steps.length === 0) {
      const step = await this.getStepFromApi();
      chatSteps[step.id] = step;
      steps = [step];
    } else {
      for (let i = 0, len = steps.length; i < len; i += 1) {
        const step = parseStep ? parseStep(steps[i]) : steps[i];

        chatSteps[step.id] = this.assignDefaultSetting(schema.parse(step));
      }
      schema.checkInvalidIds(chatSteps);
    }

    const firstStep = steps[0];
    if (firstStep.message) {
      const { message } = firstStep;
      firstStep.message = typeof message === 'function' ? message() : message;
      chatSteps[firstStep.id].message = firstStep.message;
    }

    const { recognitionEnable } = this.state;
    const { recognitionLang } = this.props;

    if (recognitionEnable) {
      this.recognition = new Recognition(
        this.onRecognitionChange,
        this.onRecognitionEnd,
        this.onRecognitionStop,
        recognitionLang
      );
    }

    this.supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;

    if (this.content) {
      this.content.addEventListener('DOMNodeInserted', this.onNodeInserted);
      window.addEventListener('resize', this.onResize);
    }

    const { currentStep, previousStep, previousSteps, renderedSteps } = await storage.getData(
      {
        cacheName,
        cache,
        firstStep,
        steps: chatSteps,
        getStepFromApi: this.getStepFromApi
      },
      () => {
        // focus input if last step cached is a user step
        this.setState({ disabled: false }, () => {
          if (enableMobileAutoFocus || !isMobile()) {
            if (this.input) {
              this.input.focus();
            }
          }
        });
      }
    );

    this.setState({
      currentStep,
      previousStep,
      previousSteps,
      renderedSteps,
      steps: chatSteps
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { opened, toggleFloating } = props;
    if (toggleFloating !== undefined && opened !== undefined && opened !== state.opened) {
      return {
        ...state,
        opened
      };
    }
    return state;
  }

  componentWillUnmount() {
    if (this.content) {
      this.content.removeEventListener('DOMNodeInserted', this.onNodeInserted);
      window.removeEventListener('resize', this.onResize);
    }
  }

  getDefaultSettings = () => {
    const { botDelay, botAvatar, userDelay, userAvatar, customDelay } = this.props;

    const defaultBotSettings = { delay: botDelay, avatar: botAvatar };
    const defaultUserSettings = {
      delay: userDelay,
      avatar: userAvatar,
      hideInput: false,
      hideExtraControl: false
    };
    const defaultCustomSettings = { delay: customDelay };

    return { defaultBotSettings, defaultUserSettings, defaultCustomSettings };
  };

  onNodeInserted = event => {
    const { currentTarget: target } = event;
    const { enableSmoothScroll } = this.props;

    if (enableSmoothScroll && this.supportsScrollBehavior) {
      target.scroll({
        top: target.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      target.scrollTop = target.scrollHeight;
    }
  };

  onResize = () => {
    this.content.scrollTop = this.content.scrollHeight;
  };

  onRecognitionChange = value => {
    this.setState({ inputValue: value });
  };

  onRecognitionEnd = () => {
    this.setState({ speaking: false });
    this.handleSubmitButton();
  };

  onRecognitionStop = () => {
    this.setState({ speaking: false });
  };

  onValueChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  getTriggeredStep = (trigger, value) => {
    const steps = this.generateRenderedStepsById();
    return typeof trigger === 'function' ? trigger({ value, steps }) : trigger;
  };

  getStepMessage = message => {
    const { previousSteps } = this.state;
    const lastStepIndex = previousSteps.length > 0 ? previousSteps.length - 1 : 0;
    const steps = this.generateRenderedStepsById();
    const previousValue = previousSteps[lastStepIndex].value;
    return typeof message === 'function' ? message({ previousValue, steps }) : message;
  };

  generateRenderedStepsById = () => {
    const { previousSteps } = this.state;
    return this.generateStepsById(previousSteps);
  };

  generateStepsById = previousSteps => {
    const steps = {};

    for (let i = 0, len = previousSteps.length; i < len; i += 1) {
      const { id, message, value, metadata } = previousSteps[i];

      steps[id] = {
        id,
        message,
        value,
        metadata
      };
    }

    return steps;
  };

  metadata = step => {
    const timestamp = { timestamp: new Date().toJSON() };
    return { metadata: Object.assign({}, step.metadata, timestamp) };
  };

  findLastStepWithId = (steps, id) => {
    if (!isVariable(id)) {
      id = makeVariable(id);
    }

    const similarSteps = steps.filter(step => step.id === id);
    return similarSteps.length > 0 ? similarSteps[similarSteps.length - 1] : null;
  };

  evaluateExpression = evalExpression => {
    const previousValues = {};
    const values = {};

    const { previousSteps, renderedSteps, currentStep } = this.state;
    renderedSteps.forEach(step => {
      if (step.value != null) {
        previousValues[step.id] = deepCopy(step.value);
      }
    });
    if (currentStep.value != null) previousValues[currentStep.id] = deepCopy(currentStep.value);

    // eslint-disable-next-line no-eval
    eval(evalExpression);

    // append user assigned values into chat
    for (const id in values) {
      if (Object.prototype.hasOwnProperty.call(values, id)) {
        const newStep = {
          '@class': '.ValueStep',
          id,
          value: values[id]
        };
        previousSteps.push(newStep);
        renderedSteps.push(newStep);
      }
    }

    this.setState({ previousSteps, renderedSteps });
  };

  triggerNextStep = async data => {
    const { enableMobileAutoFocus } = this.props;
    const { previousSteps, renderedSteps, steps } = this.state;
    const { defaultUserSettings } = this.getDefaultSettings();

    let { currentStep, previousStep } = this.state;

    const getValueFromData = () => {
      if (data && data.value) {
        return data.value;
      }
      if (data && Array.isArray(data)) {
        return data.map(each => each.value);
      }
      return null;
    };

    const value = getValueFromData();

    if (value) {
      if (isNestedVariable(currentStep.id)) {
        this.saveValueAsStep(value, currentStep.id, renderedSteps, previousSteps);
      } else {
        currentStep.value = value;
      }
    }
    if (data && data.hideInput) {
      currentStep.hideInput = data.hideInput;
    }
    if (data && data.hideExtraControl) {
      currentStep.hideExtraControl = data.hideExtraControl;
    }
    if (data && data.trigger) {
      currentStep.trigger = this.getTriggeredStep(data.trigger, value);
    }

    if (currentStep.options && data) {
      const option = Object.assign({}, currentStep.options.filter(o => deepEqual(o, data))[0]);
      const trigger = this.getTriggeredStep(option.trigger, currentStep.value);
      delete currentStep.options;

      // Find the last state and append it to the new one
      const lastSameSteps = renderedSteps.filter(step => step.id === currentStep.id);
      const lastSameStep = lastSameSteps.length > 1 && lastSameSteps[lastSameSteps.length - 2];
      if (typeof lastSameStep.value === 'object' && typeof option.value === 'object') {
        option.value = {
          ...lastSameStep.value,
          ...option.value
        };
      }

      // replace choose option for user message
      currentStep = Object.assign(
        {},
        currentStep,
        option,
        defaultUserSettings,
        {
          user: true,
          message: option.label,
          trigger,
          end: !trigger
        },
        this.metadata(currentStep)
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps
      });
    } else if (currentStep.choices && data) {
      const message = data.map(each => each.label).join(', ');
      delete currentStep.choices;

      currentStep = Object.assign(
        {},
        currentStep,
        defaultUserSettings,
        {
          user: true,
          message,
          value
        },
        this.metadata(currentStep)
      );

      renderedSteps.pop();
      previousSteps.pop();
      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState({
        currentStep,
        renderedSteps,
        previousSteps
      });
    } else if (currentStep.end) {
      this.handleEnd();
    } else if (currentStep.trigger) {
      if (currentStep.replace) {
        renderedSteps.pop();
      }

      const nextStep = await this.getNextStep(currentStep, steps);

      previousStep = currentStep;
      currentStep = nextStep;

      this.setState({ renderedSteps, currentStep, previousStep }, () => {
        if (nextStep.user) {
          this.setState({ disabled: false }, () => {
            if (enableMobileAutoFocus || !isMobile()) {
              if (this.input) {
                this.input.focus();
              }
            }
          });
        } else {
          renderedSteps.push(nextStep);
          previousSteps.push(nextStep);

          this.setState({ renderedSteps, previousSteps });
        }
      });
    }

    const { cache, cacheName } = this.props;
    if (cache) {
      // TODO: Get rid of this setTimeout (use promises/async-await)
      setTimeout(() => {
        storage.setData(cacheName, {
          currentStep,
          previousStep,
          previousSteps,
          renderedSteps
        });
      }, 10);
    }

    const { handleNextStep } = this.props;
    if (handleNextStep) {
      // TODO: Get rid of this setTimeout (use promises/async-await)
      setTimeout(() => {
        handleNextStep({
          currentStep,
          previousStep,
          previousSteps,
          renderedSteps
        });
      }, 300);
    }
  };

  getNextStep = async (currentStep, steps) => {
    const { nextStepUrl } = this.props;
    const trigger = this.getTriggeredStep(currentStep.trigger, currentStep.value);
    let nextStep = steps[trigger]
      ? Object.assign({}, steps[trigger])
      : await this.getStepFromApi(trigger);
    if (nextStep.message) {
      nextStep.message = this.getStepMessage(nextStep.message);
    } else if (nextStep.update) {
      const updateStep = nextStep;
      if (nextStepUrl && !steps[updateStep.update])
        steps[updateStep.update] = await this.getStepFromApi(updateStep.update);
      nextStep = Object.assign({}, steps[updateStep.update], { updatedBy: updateStep.id });
      nextStep.end = updateStep.end;
      nextStep.id = updateStep.update;
      if (nextStep.options || updateStep.updateOptions) {
        if (updateStep.updateOptions) {
          nextStep.options = updateStep.updateOptions;
        } else {
          for (let i = 0, len = nextStep.options.length; i < len; i += 1) {
            nextStep.options[i].trigger = updateStep.trigger;
          }
        }
        nextStep.user = false;
      } else {
        if (updateStep.updateUser) nextStep.user = updateStep.updateUser;
        if (updateStep.validator) nextStep.validator = updateStep.validator;
        if (updateStep.parser) nextStep.parser = updateStep.parser;
        nextStep.trigger = updateStep.trigger;
      }
    }

    if (typeof nextStep.evalExpression === 'string') {
      this.evaluateExpression(nextStep.evalExpression);
    }

    nextStep.key = Random(24);
    return nextStep;
  };

  getStepFromApi = async trigger => {
    const { nextStepUrl, parseStep } = this.props;
    const step = await getStepFromBackend(nextStepUrl, trigger);

    const parsedStep = parseStep ? parseStep(step) : step;
    const completeStep = this.assignDefaultSetting(schema.parse(parsedStep));

    // append to steps
    const { steps } = this.state;
    steps[completeStep.id] = completeStep;
    this.setState({ steps });

    return completeStep;
  };

  assignDefaultSetting = step => {
    const {
      defaultBotSettings,
      defaultUserSettings,
      defaultCustomSettings
    } = this.getDefaultSettings();

    let settings = {};
    if (step.user) {
      settings = defaultUserSettings;
    } else if (step.message || step.asMessage) {
      settings = defaultBotSettings;
    } else if (step.component) {
      settings = defaultCustomSettings;
    }

    return Object.assign({}, settings, step);
  };

  saveValueAsStep = (value, id, renderedSteps, previousSteps) => {
    const [parentObjectName, remaining] = splitByFirstPeriod(id);
    const parentStep = this.findLastStepWithId(renderedSteps, parentObjectName);
    if (!parentStep) {
      // eslint-disable-next-line no-console
      console.error('Error: Could not find parent step of the nested variable');
    } else {
      const newStep = {
        '@class': '.ValueStep',
        id: parentStep.id,
        value: deepCopy(parentStep.value)
      };
      insertIntoObjectByPath(newStep.value, remaining, value);

      // put newStep in second last position as some code later is going to replace last current element with updated current element
      const lastStepOfPreviousSteps = previousSteps.pop();
      const lastStepOfRenderedSteps = renderedSteps.pop();
      previousSteps.push(newStep);
      renderedSteps.push(newStep);
      if (lastStepOfPreviousSteps) previousSteps.push(lastStepOfPreviousSteps);
      if (lastStepOfRenderedSteps) renderedSteps.push(lastStepOfRenderedSteps);
    }
  };

  handleEnd = () => {
    const { handleEnd } = this.props;

    if (handleEnd) {
      const { previousSteps } = this.state;

      const renderedSteps = previousSteps.map(step => {
        const { id, message, value, metadata } = step;

        return {
          id,
          message,
          value,
          metadata
        };
      });

      const steps = [];

      for (let i = 0, len = previousSteps.length; i < len; i += 1) {
        const { id, message, value, metadata } = previousSteps[i];

        steps[id] = {
          id,
          message,
          value,
          metadata
        };
      }

      const values = previousSteps.filter(step => step.value).map(step => step.value);

      handleEnd({ renderedSteps, steps, values });
    }
  };

  isInputValueEmpty = () => {
    const { inputValue } = this.state;
    return !inputValue || inputValue.length === 0;
  };

  isLastPosition = step => {
    const { renderedSteps } = this.state;
    const { length } = renderedSteps;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (length <= 1 || stepIndex + 1 === length) {
      return true;
    }

    const nextStep = renderedSteps[stepIndex + 1];
    const hasMessage = nextStep.message || nextStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isLast = step.user !== nextStep.user;
    return isLast;
  };

  isFirstPosition = step => {
    const { renderedSteps } = this.state;
    const stepIndex = renderedSteps.map(s => s.key).indexOf(step.key);

    if (stepIndex === 0) {
      return true;
    }

    const lastStep = renderedSteps[stepIndex - 1];
    const hasMessage = lastStep.message || lastStep.asMessage;

    if (!hasMessage) {
      return true;
    }

    const isFirst = step.user !== lastStep.user;
    return isFirst;
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.submitUserMessage();
    }
  };

  handleSubmitButton = () => {
    const { speaking, recognitionEnable } = this.state;

    if ((this.isInputValueEmpty() || speaking) && recognitionEnable) {
      this.recognition.speak();
      if (!speaking) {
        this.setState({ speaking: true });
      }
      return;
    }

    this.submitUserMessage();
  };

  submitUserMessage = () => {
    const { inputValue, previousSteps, renderedSteps } = this.state;
    const { defaultUserSettings } = this.getDefaultSettings();
    let { currentStep } = this.state;

    const isInvalid = currentStep.validator && this.checkInvalidInput();

    const parsedValue = currentStep.parser ? currentStep.parser(inputValue) : inputValue;

    if (!isInvalid) {
      const step = {
        message: inputValue,
        value: parsedValue
      };

      if (isNestedVariable(currentStep.id)) {
        const [parentObjectName, remaining] = splitByFirstPeriod(currentStep.id);
        const parentStep = this.findLastStepWithId(renderedSteps, parentObjectName);
        if (!parentStep) {
          // eslint-disable-next-line no-console
          console.error('Error: Could not find parent step of the nested variable');
        } else {
          const newStep = {
            '@class': '.ValueStep',
            id: parentStep.id,
            value: deepCopy(parentStep.value)
          };
          insertIntoObjectByPath(newStep.value, remaining, parsedValue);
          previousSteps.push(newStep);
          renderedSteps.push(newStep);
        }
      }
      currentStep = Object.assign({}, defaultUserSettings, currentStep, step, this.metadata(step));

      renderedSteps.push(currentStep);
      previousSteps.push(currentStep);

      this.setState(
        {
          currentStep,
          renderedSteps,
          previousSteps,
          disabled: true,
          inputValue: ''
        },
        () => {
          if (this.input) {
            this.input.blur();
          }
        }
      );
    }
  };

  checkInvalidInput = () => {
    const { enableMobileAutoFocus } = this.props;
    const { currentStep, inputValue } = this.state;
    const result = currentStep.validator(inputValue);
    const value = inputValue;

    if (typeof result !== 'boolean' || !result) {
      this.setState(
        {
          inputValue: result.toString(),
          inputInvalid: true,
          disabled: true
        },
        () => {
          setTimeout(() => {
            this.setState(
              {
                inputValue: value,
                inputInvalid: false,
                disabled: false
              },
              () => {
                if (enableMobileAutoFocus || !isMobile()) {
                  if (this.input) {
                    this.input.focus();
                  }
                }
              }
            );
          }, 2000);
        }
      );

      return true;
    }

    return false;
  };

  toggleChatBot = opened => {
    const { toggleFloating } = this.props;

    if (toggleFloating) {
      toggleFloating({ opened });
    } else {
      this.setState({ opened });
    }
  };

  renderStep = (step, index) => {
    const { renderedSteps } = this.state;
    const {
      avatarStyle,
      bubbleStyle,
      bubbleOptionStyle,
      customStyle,
      hideBotAvatar,
      hideUserAvatar,
      speechSynthesis,
      readOnly
    } = this.props;
    const { options, component, asMessage, choices } = step;
    const steps = this.generateRenderedStepsById();
    const previousStep = index > 0 ? renderedSteps[index - 1] : {};
    const previousSteps = index > 0 ? this.generateStepsById(renderedSteps.slice(0, index)) : {};

    const disabledStyle = { pointerEvents: 'none' };
    const doNothing = () => {};

    // '.ValueStep's should not be rendered
    if (step['@class'] === '.ValueStep') {
      return null;
    }

    if (component && !asMessage) {
      return (
        <CustomStep
          key={index}
          speak={this.speak}
          step={step}
          steps={steps}
          style={customStyle}
          previousStep={previousStep}
          previousValue={previousStep.value}
          triggerNextStep={this.triggerNextStep}
        />
      );
    }

    if (options) {
      return (
        <OptionsStep
          key={index}
          step={step}
          previousValue={previousStep.value}
          triggerNextStep={readOnly ? doNothing : this.triggerNextStep}
          bubbleOptionStyle={bubbleOptionStyle}
          style={readOnly ? disabledStyle : null}
        />
      );
    }

    if (choices) {
      return (
        <MultipleChoiceStep
          key={index}
          speak={this.speak}
          step={step}
          previousValue={previousStep.value}
          bubbleChoiceStyle={bubbleOptionStyle}
          triggerNextStep={readOnly ? doNothing : this.triggerNextStep}
          style={readOnly ? disabledStyle : null}
        />
      );
    }

    return (
      <TextStep
        key={index}
        step={step}
        steps={steps}
        speak={this.speak}
        previousStep={previousStep}
        previousSteps={previousSteps}
        previousValue={previousStep.value}
        triggerNextStep={this.triggerNextStep}
        avatarStyle={avatarStyle}
        bubbleStyle={bubbleStyle}
        hideBotAvatar={hideBotAvatar}
        hideUserAvatar={hideUserAvatar}
        speechSynthesis={speechSynthesis}
        isFirst={this.isFirstPosition(step)}
        isLast={this.isLastPosition(step)}
      />
    );
  };

  render() {
    const {
      currentStep,
      disabled,
      inputInvalid,
      inputValue,
      opened,
      renderedSteps,
      speaking,
      recognitionEnable
    } = this.state;
    const {
      className,
      contentStyle,
      extraControl,
      controlStyle,
      floating,
      floatingIcon,
      floatingStyle,
      footerStyle,
      headerComponent,
      headerTitle,
      hideHeader,
      hideSubmitButton,
      inputStyle,
      placeholder,
      inputAttributes,
      recognitionPlaceholder,
      style,
      submitButtonStyle,
      width,
      height,
      readOnly
    } = this.props;

    const header = headerComponent || (
      <Header className="rsc-header">
        <HeaderTitle className="rsc-header-title">{headerTitle}</HeaderTitle>
        {floating && (
          <HeaderIcon className="rsc-header-close-button" onClick={() => this.toggleChatBot(false)}>
            <CloseIcon />
          </HeaderIcon>
        )}
      </Header>
    );

    let customControl;
    if (extraControl !== undefined) {
      customControl = React.cloneElement(extraControl, {
        disabled,
        speaking,
        invalid: inputInvalid
      });
    }

    const icon =
      (this.isInputValueEmpty() || speaking) && recognitionEnable ? <MicIcon /> : <SubmitIcon />;

    const inputPlaceholder = speaking
      ? recognitionPlaceholder
      : currentStep.placeholder || placeholder;

    const inputAttributesOverride = currentStep.inputAttributes || inputAttributes;

    return (
      <div className={`rsc ${className}`} style={readOnly ? { cursor: 'not-allowed' } : null}>
        {floating && (
          <FloatButton
            className="rsc-float-button"
            style={floatingStyle}
            opened={opened}
            onClick={() => this.toggleChatBot(true)}
          >
            {typeof floatingIcon === 'string' ? <FloatingIcon src={floatingIcon} /> : floatingIcon}
          </FloatButton>
        )}
        <ChatBotContainer
          className="rsc-container"
          floating={floating}
          floatingStyle={floatingStyle}
          opened={opened}
          style={style}
          width={width}
          height={height}
        >
          {!hideHeader && header}
          <Content
            className="rsc-content"
            ref={this.setContentRef}
            floating={floating}
            style={contentStyle}
            height={height}
            hideInput={currentStep.hideInput}
          >
            {renderedSteps.map(this.renderStep)}
          </Content>
          <Footer className="rsc-footer" style={footerStyle}>
            {!currentStep.hideInput && (
              <Input
                type="textarea"
                style={inputStyle}
                ref={this.setInputRef}
                className="rsc-input"
                placeholder={inputInvalid ? '' : inputPlaceholder}
                onKeyPress={this.handleKeyPress}
                onChange={this.onValueChange}
                value={inputValue}
                floating={floating}
                invalid={inputInvalid}
                disabled={disabled || readOnly}
                hasButton={!hideSubmitButton}
                {...inputAttributesOverride}
              />
            )}
            <div style={controlStyle} className="rsc-controls">
              {!currentStep.hideInput && !currentStep.hideExtraControl && customControl}
              {!currentStep.hideInput && !hideSubmitButton && (
                <SubmitButton
                  className="rsc-submit-button"
                  style={submitButtonStyle}
                  onClick={this.handleSubmitButton}
                  invalid={inputInvalid}
                  disabled={disabled}
                  speaking={speaking}
                >
                  {icon}
                </SubmitButton>
              )}
            </div>
          </Footer>
        </ChatBotContainer>
      </div>
    );
  }
}

ChatBot.propTypes = {
  nextStepUrl: PropTypes.string,
  parseStep: PropTypes.func,
  avatarStyle: PropTypes.objectOf(PropTypes.any),
  botAvatar: PropTypes.string,
  botDelay: PropTypes.number,
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any),
  bubbleStyle: PropTypes.objectOf(PropTypes.any),
  cache: PropTypes.bool,
  cacheName: PropTypes.string,
  className: PropTypes.string,
  contentStyle: PropTypes.objectOf(PropTypes.any),
  customDelay: PropTypes.number,
  customStyle: PropTypes.objectOf(PropTypes.any),
  controlStyle: PropTypes.objectOf(PropTypes.any),
  enableMobileAutoFocus: PropTypes.bool,
  enableSmoothScroll: PropTypes.bool,
  extraControl: PropTypes.objectOf(PropTypes.element),
  floating: PropTypes.bool,
  floatingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  floatingStyle: PropTypes.objectOf(PropTypes.any),
  footerStyle: PropTypes.objectOf(PropTypes.any),
  handleEnd: PropTypes.func,
  handleNextStep: PropTypes.func,
  headerComponent: PropTypes.element,
  headerTitle: PropTypes.string,
  height: PropTypes.string,
  hideBotAvatar: PropTypes.bool,
  hideHeader: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
  hideUserAvatar: PropTypes.bool,
  inputAttributes: PropTypes.objectOf(PropTypes.any),
  inputStyle: PropTypes.objectOf(PropTypes.any),
  opened: PropTypes.bool,
  toggleFloating: PropTypes.func,
  placeholder: PropTypes.string,
  recognitionEnable: PropTypes.bool,
  recognitionLang: PropTypes.string,
  recognitionPlaceholder: PropTypes.string,
  speechSynthesis: PropTypes.shape({
    enable: PropTypes.bool,
    lang: PropTypes.string,
    voice:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(window.SpeechSynthesisVoice)
        : PropTypes.any
  }),
  steps: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.objectOf(PropTypes.any),
  submitButtonStyle: PropTypes.objectOf(PropTypes.any),
  userAvatar: PropTypes.string,
  userDelay: PropTypes.number,
  width: PropTypes.string
};

ChatBot.defaultProps = {
  nextStepUrl: undefined,
  parseStep: undefined,
  steps: undefined,
  avatarStyle: {},
  botDelay: 1000,
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
  extraControl: undefined,
  floating: false,
  floatingIcon: <ChatIcon />,
  floatingStyle: {},
  footerStyle: {},
  handleEnd: undefined,
  handleNextStep: undefined,
  headerComponent: undefined,
  headerTitle: 'Chat',
  height: '520px',
  hideBotAvatar: false,
  hideHeader: false,
  hideSubmitButton: false,
  hideUserAvatar: false,
  inputStyle: {},
  opened: undefined,
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
  toggleFloating: undefined,
  userDelay: 1000,
  width: '350px',
  botAvatar:
    "data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e",
  userAvatar:
    "data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e"
};

export default ChatBot;
