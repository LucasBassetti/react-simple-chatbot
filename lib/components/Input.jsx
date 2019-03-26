import { invalidInput } from '../common/animations';
import styled, { css } from 'styled-components';

const Input = styled.input`
  animation: ${props =>
    props.invalid
      ? css`
          ${invalidInput} .2s ease
        `
      : ''};
  border: 0;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: ${props => (props.invalid ? '0' : '1px solid #eee')};
  box-shadow: ${props => (props.invalid ? 'inset 0 0 2px #E53935' : 'none')};
  box-sizing: border-box;
  color: ${props => (props.invalid ? '#E53935' : '')};
  font-size: 16px;
  opacity: ${props => (props.disabled && !props.invalid ? '.5' : '1')};
  outline: none;
  padding: ${props => (props.hasButton ? '16px 52px 16px 10px' : '16px 10px')};
  width: 100%;
  -webkit-appearance: none;

  &:disabled {
    background: #fff;
  }

  @media screen and (max-width: 568px) {
    border-bottom-left-radius: ${props => (props.floating ? '0' : '10px')};
    border-bottom-right-radius: ${props => (props.floating ? '0' : '10px')};
  }
`;

export default Input;
