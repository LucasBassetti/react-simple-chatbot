import { css, keyframes } from 'styled-components';
import rgba from './rgba';

const typing = keyframes`
  0%, 60%, 100% { opacity: .35; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
`;

const enter = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(.98); }
  to { opacity: 1; transform: none; }
`;

const invalidInput = keyframes`
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
`;

const pulse = (color: string) => keyframes`
  0% { box-shadow: 0 0 0 0 ${rgba(color, 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${rgba(color, 0)}; }
  100% { box-shadow: 0 0 0 0 ${rgba(color, 0)}; }
`;

/** Entrance of the messages, disabled for users who prefer reduced motion */
const enterAnimation = css`
  animation: ${enter} 0.25s ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export { typing, enter, enterAnimation, invalidInput, pulse };
