// props used only for styling, they must not reach the DOM
const STYLE_PROPS = [
  'floating',
  'floatingStyle',
  'hasButton',
  'hideInput',
  'invalid',
  'isFirst',
  'isLast',
  'opened',
  'showAvatar',
  'speaking',
  'user'
];

// styled-components >= 5.1 calls shouldForwardProp (v5 passes its default
// validator, v6 forwards everything by default). Older versions ignore it and
// already filter unknown props.
export default {
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !STYLE_PROPS.includes(prop) &&
    (typeof defaultValidatorFn === 'function' ? defaultValidatorFn(prop) : true)
};
