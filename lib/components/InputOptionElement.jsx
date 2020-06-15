import styled from 'styled-components';
import { slideIn } from '../common/animations';

const InputOptionElement = styled.button`
  background-color: #ddd;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  outline: 0;
  width: 60px;
  animation: ${slideIn} 1s;
  &:hover {
    opacity: 0.7;
  }
`;

export default InputOptionElement;
