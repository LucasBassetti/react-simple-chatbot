import styled from 'styled-components';
import { loading } from '../../common/animations';
import withConfig from '../../common/withConfig';

const LoadingStep = styled.span.withConfig(withConfig)`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${props => props.delay};
`;

export default LoadingStep;
