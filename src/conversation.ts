import schema from './schemas/schema';
import type {
  ChatBotProps,
  ChatStep,
  ChatSteps,
  HandleEndArgs,
  Message,
  RenderedStep,
  RenderedSteps,
  StepId,
  Trigger
} from './types';

// props used to build the steps, the steps are built again when they change
export const STEPS_PROPS = [
  'steps',
  'botAvatar',
  'botDelay',
  'botName',
  'customDelay',
  'userAvatar',
  'userDelay'
] as const;

export type StepsProps = Pick<ChatBotProps, (typeof STEPS_PROPS)[number]>;

export interface BuiltSteps {
  chatSteps: ChatSteps;
  defaultUserSettings: Partial<ChatStep>;
}

export const pickStepsProps = (props: StepsProps): StepsProps => {
  const picked: Record<string, unknown> = {};
  STEPS_PROPS.forEach(key => {
    picked[key] = props[key];
  });
  return picked as StepsProps;
};

export const stepsPropsChanged = (previous: StepsProps, next: StepsProps): boolean =>
  STEPS_PROPS.some(key => previous[key] !== next[key]);

/**
 * Validate the steps and add the default settings of each type of step
 */
export const buildSteps = ({
  botAvatar,
  botDelay,
  botName,
  customDelay,
  steps,
  userAvatar,
  userDelay
}: StepsProps): BuiltSteps => {
  const chatSteps: ChatSteps = {};

  const defaultBotSettings = { delay: botDelay, avatar: botAvatar, botName };
  const defaultUserSettings = {
    delay: userDelay,
    avatar: userAvatar,
    hideInput: false,
    hideExtraControl: false
  };
  const defaultCustomSettings = { delay: customDelay };

  for (const step of steps) {
    let settings = {};

    if ('user' in step && step.user) {
      settings = defaultUserSettings;
    } else if (('message' in step && step.message) || ('asMessage' in step && step.asMessage)) {
      settings = defaultBotSettings;
    } else if ('component' in step && step.component) {
      settings = defaultCustomSettings;
    }

    const chatStep: ChatStep = { ...settings, ...schema.parse(step) };

    if (Array.isArray(chatStep.options)) {
      // options without value are selected by their label
      chatStep.options = chatStep.options.map(option =>
        option.value === undefined ? { ...option, value: option.label } : option
      );
    }

    chatSteps[step.id] = chatStep;
  }

  schema.checkInvalidIds(chatSteps);

  return { chatSteps, defaultUserSettings };
};

/**
 * The rendered steps by id, as received by the functions of the steps
 */
const toRenderedStep = ({ id, message, value, metadata }: ChatStep): RenderedStep => ({
  id,
  message: message as string | undefined,
  value,
  metadata
});

export const getRenderedStepsById = (previousSteps: ChatStep[]): RenderedSteps => {
  const steps: RenderedSteps = {};

  for (const step of previousSteps) {
    steps[step.id] = toRenderedStep(step);
  }

  return steps;
};

export const resolveTrigger = (
  trigger: Trigger,
  value: unknown,
  previousSteps: ChatStep[]
): StepId =>
  typeof trigger === 'function'
    ? trigger({ value, steps: getRenderedStepsById(previousSteps) })
    : trigger;

export const resolveMessage = (message: Message, previousSteps: ChatStep[]): string => {
  if (typeof message !== 'function') {
    return message;
  }
  const lastStep = previousSteps[previousSteps.length - 1];
  return message({
    previousValue: lastStep ? lastStep.value : undefined,
    steps: getRenderedStepsById(previousSteps)
  });
};

export const getHandleEndArgs = (previousSteps: ChatStep[]): HandleEndArgs => {
  const renderedSteps = previousSteps.map(toRenderedStep);
  const steps = getRenderedStepsById(previousSteps);
  const values = previousSteps.filter(step => step.value).map(step => step.value);

  return { renderedSteps, steps, values };
};

const hasMessage = (step: ChatStep) => Boolean(step.message || step.asMessage);

/**
 * Whether the step starts a group of messages of the same author
 */
export const isFirstPosition = (renderedSteps: ChatStep[], index: number): boolean => {
  if (index === 0) {
    return true;
  }

  const step = renderedSteps[index];
  const lastStep = renderedSteps[index - 1];

  if (!hasMessage(lastStep)) {
    return true;
  }

  return step.user !== lastStep.user;
};

/**
 * Whether the step ends a group of messages of the same author
 */
export const isLastPosition = (renderedSteps: ChatStep[], index: number): boolean => {
  const { length } = renderedSteps;

  if (length <= 1 || index + 1 === length) {
    return true;
  }

  const step = renderedSteps[index];
  const nextStep = renderedSteps[index + 1];

  if (!hasMessage(nextStep)) {
    return true;
  }

  return step.user !== nextStep.user;
};
