import type { CSSProperties, InputHTMLAttributes, ReactElement } from 'react';

export type StepId = string | number;

export interface RenderedStep {
  id: StepId;
  message?: string;
  value?: any;
  metadata?: Record<string, any>;
}

export type RenderedSteps = Record<string, RenderedStep>;

export type Trigger = StepId | ((args: { value: any; steps: RenderedSteps }) => StepId);

export type Message = string | ((args: { previousValue: any; steps: RenderedSteps }) => string);

interface BaseStep {
  id: StepId;
  end?: boolean;
  placeholder?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  metadata?: Record<string, any>;
}

export interface TextStep extends BaseStep {
  message: Message;
  avatar?: string;
  trigger?: Trigger;
  delay?: number;
  hideInput?: boolean;
  hideExtraControl?: boolean;
}

export interface UserStep extends BaseStep {
  user: true;
  trigger?: Trigger;
  hideExtraControl?: boolean;
  /** Return true when the value is valid, or the error message to show */
  validator?: (value: string) => boolean | string;
}

export interface Option {
  label: string;
  /** Defaults to the label */
  value?: any;
  trigger: Trigger;
}

export interface OptionsStep extends BaseStep {
  options: Option[];
  hideInput?: boolean;
  hideExtraControl?: boolean;
}

export interface CustomStep extends BaseStep {
  component: ReactElement;
  avatar?: string;
  replace?: boolean;
  waitAction?: boolean;
  asMessage?: boolean;
  trigger?: Trigger;
  delay?: number;
  hideInput?: boolean;
  hideExtraControl?: boolean;
}

export interface UpdateStep extends BaseStep {
  update: StepId;
  trigger: Trigger;
}

export type Step = TextStep | UserStep | OptionsStep | CustomStep | UpdateStep;

export interface TriggerNextStepData {
  value?: any;
  trigger?: Trigger;
  hideInput?: boolean;
  hideExtraControl?: boolean;
}

/** Props injected in the components of custom steps */
export interface CustomComponentProps {
  step?: Step & { value?: any };
  steps?: RenderedSteps;
  previousStep?: Step & { value?: any };
  triggerNextStep?: (data?: TriggerNextStepData) => void;
}

export interface HandleEndArgs {
  renderedSteps: RenderedStep[];
  steps: RenderedSteps;
  values: any[];
}

export interface SpeechSynthesisOptions {
  enable?: boolean;
  lang?: string;
  voice?: SpeechSynthesisVoice | null;
}

export interface ChatBotTheme {
  background: string;
  fontFamily: string;
  headerBgColor: string;
  headerFontColor: string;
  headerFontSize: string;
  botBubbleColor: string;
  botFontColor: string;
  userBubbleColor: string;
  userFontColor: string;
}

export interface ChatBotProps {
  steps: Step[];
  avatarStyle?: CSSProperties;
  botAvatar?: string;
  botDelay?: number;
  botName?: string;
  bubbleOptionStyle?: CSSProperties;
  bubbleStyle?: CSSProperties;
  cache?: boolean;
  cacheName?: string;
  className?: string;
  contentStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  customDelay?: number;
  customStyle?: CSSProperties;
  enableMobileAutoFocus?: boolean;
  enableSmoothScroll?: boolean;
  extraControl?: ReactElement<any>;
  floating?: boolean;
  floatingIcon?: string | ReactElement;
  floatingStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  handleEnd?: (args: HandleEndArgs) => void;
  headerComponent?: ReactElement;
  headerTitle?: string;
  height?: string;
  hideBotAvatar?: boolean;
  hideHeader?: boolean;
  hideSubmitButton?: boolean;
  hideUserAvatar?: boolean;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  inputStyle?: CSSProperties;
  opened?: boolean;
  placeholder?: string;
  recognitionEnable?: boolean;
  recognitionLang?: string;
  recognitionPlaceholder?: string;
  speechSynthesis?: SpeechSynthesisOptions;
  style?: CSSProperties;
  submitButtonStyle?: CSSProperties;
  toggleFloating?: (args: { opened: boolean }) => void;
  userAvatar?: string;
  userDelay?: number;
  width?: string;
}

/**
 * A step as used internally: the definition with the default settings, and
 * the data added while the conversation runs.
 * @internal
 */
export interface ChatStep {
  id: StepId;
  /** unique key of the rendered step */
  key?: string;
  message?: Message;
  user?: boolean;
  options?: Option[];
  component?: ReactElement<any>;
  update?: StepId;
  trigger?: Trigger;
  value?: any;
  avatar?: string;
  botName?: string;
  delay?: number;
  end?: boolean;
  replace?: boolean;
  waitAction?: boolean;
  asMessage?: boolean;
  placeholder?: string;
  hideInput?: boolean;
  hideExtraControl?: boolean;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  metadata?: Record<string, any>;
  validator?: (value: string) => boolean | string;
  /** set on the steps restored from the cache, they must not trigger the next step again */
  rendered?: boolean;
}

/** @internal */
export type ChatSteps = Record<string, ChatStep>;
