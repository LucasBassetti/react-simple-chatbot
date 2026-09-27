import styled from 'styled-components';
import { loading } from '../../common/animations';

const LoadingStep = styled.span<{ $delay: string }>`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${({ $delay }) => $delay};
`;

export default LoadingStep;
