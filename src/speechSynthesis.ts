import { isString } from './utils';
import type { ChatStep, SpeechSynthesisOptions } from './types';

export type SpeakFn = (step: ChatStep, previousValue?: unknown) => void;

export const getSpeakText = (step: Pick<ChatStep, 'message' | 'metadata'>): string => {
  const { message, metadata = {} } = step;
  if (isString(metadata.speak)) {
    return metadata.speak;
  }
  if (isString(message)) {
    return message;
  }
  return '';
};

export const speakFn =
  (speechSynthesisOptions: SpeechSynthesisOptions): SpeakFn =>
  (step, previousValue) => {
    const { lang, voice, enable } = speechSynthesisOptions;
    const { user } = step;

    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      return;
    }
    if (user) {
      return;
    }
    if (!enable) {
      return;
    }
    const text = getSpeakText(step);
    const msg = new window.SpeechSynthesisUtterance();
    msg.text = text.replace(/{previousValue}/g, String(previousValue));
    msg.lang = lang as string;
    msg.voice = voice as SpeechSynthesisVoice | null;
    window.speechSynthesis.speak(msg);
  };
