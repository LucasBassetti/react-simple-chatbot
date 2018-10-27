import _ from 'lodash';

export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const speakFn = speechSynthesisOptions => (step, previousValue) => {
  const { lang, voice, enable } = speechSynthesisOptions;
  const { user, message, metadata = {} } = step;

  if (user) {
    return;
  }
  if (!enable) {
    return;
  }

  const text = _.cond([
    [() => _.isString(metadata.speak), _.constant(metadata.speak)],
    [() => _.isString(message), _.constant(message)],
    [_.stubTrue, _.constant('')],
  ])(step);

  const msg = new SpeechSynthesisUtterance();
  msg.text = text.replace(/{previousValue}/g, previousValue);
  msg.lang = lang;
  msg.voice = voice;
  window.speechSynthesis.speak(msg);
};
