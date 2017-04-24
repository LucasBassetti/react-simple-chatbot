import styled from 'styled-components';
import { invalidInput } from './common/animations';

const Input = styled.input`
  animation: ${props => props.invalid ? `${invalidInput} .2s ease` : ''};
  border: ${props => props.invalid ? '1px solid #E53935' : '0'};
  border-radius: 2px;
  border-top: ${props => props.invalid ? '1px solid #E53935' : '1px solid #ddd'};
  color: ${props => props.invalid ? '#E53935' : ''};
  font-size: 12px;
  opacity: ${props => props.disabled ? '.5' : '1'}
  padding: 12px 8px;
  width: calc(100% - 16px);
`;

export default Input;
