import styled from 'styled-components';
import { loading } from '../../common/animations';

const Loading = styled.span`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${props => props.delay};
`;

export default Loading;
