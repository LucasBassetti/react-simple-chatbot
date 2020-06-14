import styled from 'styled-components';
import { slideIn } from '../common/animations';

const InputOption = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  height: 50px;
  justify-content: space-around;
  margin: 0 0 0 70px;
  position: relative;
  animation: ${slideIn} 1s;
`;

export default InputOption;
