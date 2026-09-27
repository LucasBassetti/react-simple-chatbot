import styled from 'styled-components';
import { scale } from '../../common/animations';

const Option = styled.li`
  animation: ${scale} 0.3s ease forwards;
  cursor: pointer;
  display: inline-block;
  margin: 2px;
  transform: scale(0);
`;

export default Option;
