import styled from 'styled-components';
import { invalidInput } from './common/animations';

const Input = styled.input`
  animation: ${props => props.invalid ? `${invalidInput} .2s ease` : ''};
  border: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: ${props => props.invalid ? '0' : '1px solid #eee'};
  box-shadow: ${props => props.invalid ? 'inset 0 0 2px #E53935' : 'none'};
  color: ${props => props.invalid ? '#E53935' : ''};
  font-size: 14px;
  opacity: ${props => props.disabled && !props.invalid ? '.5' : '1'};
  outline: none;
  padding: 16px 10px;
  width: calc(100% - 20px);
  -webkit-appearance: none;

  &:disabled { background: #fff; }
`;

export default Input;
