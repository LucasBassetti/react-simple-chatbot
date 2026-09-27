import styled, { css } from 'styled-components';
import { invalidInput } from '../common/animations';

interface InputProps {
  $floating: boolean;
  $invalid: boolean;
  $hasButton: boolean;
}

const Input = styled.input<InputProps>`
  animation: ${({ $invalid }) =>
    $invalid
      ? css`
          ${invalidInput} 0.3s ease
        `
      : 'none'};
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: ${({ $invalid }) => ($invalid ? '#dc2626' : '#1f2937')};
  display: block;
  font: inherit;
  font-size: 15px;
  height: 55px;
  margin: 0;
  opacity: ${({ disabled, $invalid }) => (disabled && !$invalid ? '0.6' : '1')};
  outline: none;
  padding: ${({ $hasButton }) => ($hasButton ? '0 60px 0 16px' : '0 16px')};
  width: 100%;
  -webkit-appearance: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
`;

export default Input;
