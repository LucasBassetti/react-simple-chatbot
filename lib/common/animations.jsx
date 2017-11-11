import { keyframes } from 'styled-components';

const loading = keyframes`
  0% { opacity: .2; }
  20% { opacity: 1; }
  100% { opacity: .2; }
`;

const scale = keyframes`
  100% { transform: scale(1); }
`;

const invalidInput = keyframes`
  25% { transform: rotate(-1deg); }
  100% { transform: rotate(1deg); }
`;

export { loading, scale, invalidInput };
