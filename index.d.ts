import * as React from 'react';

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
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
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
  component: React.ReactElement;
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

export interface ChatBotProps {
  steps: Step[];
  avatarStyle?: React.CSSProperties;
  botAvatar?: string;
  botDelay?: number;
  botName?: string;
  bubbleOptionStyle?: React.CSSProperties;
  bubbleStyle?: React.CSSProperties;
  cache?: boolean;
  cacheName?: string;
  className?: string;
  contentStyle?: React.CSSProperties;
  controlStyle?: React.CSSProperties;
  customDelay?: number;
  customStyle?: React.CSSProperties;
  enableMobileAutoFocus?: boolean;
  enableSmoothScroll?: boolean;
  extraControl?: React.ReactElement;
  floating?: boolean;
  floatingIcon?: string | React.ReactElement;
  floatingStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  handleEnd?: (args: HandleEndArgs) => void;
  headerComponent?: React.ReactElement;
  headerTitle?: string;
  height?: string;
  hideBotAvatar?: boolean;
  hideHeader?: boolean;
  hideSubmitButton?: boolean;
  hideUserAvatar?: boolean;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  inputStyle?: React.CSSProperties;
  opened?: boolean;
  placeholder?: string;
  recognitionEnable?: boolean;
  recognitionLang?: string;
  recognitionPlaceholder?: string;
  speechSynthesis?: SpeechSynthesisOptions;
  style?: React.CSSProperties;
  submitButtonStyle?: React.CSSProperties;
  toggleFloating?: (args: { opened: boolean }) => void;
  userAvatar?: string;
  userDelay?: number;
  width?: string;
}

declare class ChatBot extends React.Component<ChatBotProps> {}

export declare const Loading: React.ComponentType;

export default ChatBot;
