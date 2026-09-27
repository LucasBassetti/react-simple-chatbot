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
          ${invalidInput} .2s ease
        `
      : ''};
  border: 0;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: ${({ $invalid }) => ($invalid ? '0' : '1px solid #eee')};
  box-shadow: ${({ $invalid }) => ($invalid ? 'inset 0 0 2px #E53935' : 'none')};
  box-sizing: border-box;
  color: ${({ $invalid }) => ($invalid ? '#E53935' : '')};
  font-size: 16px;
  opacity: ${({ disabled, $invalid }) => (disabled && !$invalid ? '.5' : '1')};
  outline: none;
  padding: ${({ $hasButton }) => ($hasButton ? '16px 52px 16px 10px' : '16px 10px')};
  width: 100%;
  -webkit-appearance: none;

  &:disabled {
    background: #fff;
  }

  @media screen and (max-width: 568px) {
    border-bottom-left-radius: ${({ $floating }) => ($floating ? '0' : '10px')};
    border-bottom-right-radius: ${({ $floating }) => ($floating ? '0' : '10px')};
  }
`;

export default Input;
