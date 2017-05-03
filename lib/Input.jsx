import styled from 'styled-components';
import { invalidInput } from './common/animations';

const Input = styled.input`
  animation: ${props => props.invalid ? `${invalidInput} .2s ease` : ''};
  border: ${props => props.invalid ? '1px solid #E53935' : '0'};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: ${props => props.invalid ? '1px solid #E53935' : '1px solid #eee'};
  box-shadow: none;
  color: ${props => props.invalid ? '#E53935' : ''};
  font-size: 14px;
  opacity: ${props => props.disabled && !props.invalid ? '.5' : '1'};
  outline: none;
  padding: 16px 10px;
  width: calc(100% - 22px);
  -webkit-appearance: none;
`;

export default Input;
