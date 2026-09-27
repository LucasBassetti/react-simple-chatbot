import styled from 'styled-components';
import { typing } from '../../common/animations';

const LoadingStep = styled.span<{ $delay: string }>`
  animation: ${typing} 1.2s ease-in-out infinite both;
  animation-delay: ${({ $delay }) => $delay};
  background: currentColor;
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  width: 6px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
  }
`;

export default LoadingStep;
