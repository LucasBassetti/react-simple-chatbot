import styled, { css } from 'styled-components';
import { themed } from '../theme';
import { pulse } from '../common/animations';

interface SubmitButtonProps {
  $invalid: boolean;
  $speaking: boolean;
}

const headerBgColor = themed('headerBgColor');

const SubmitButton = styled.button<SubmitButtonProps>`
  background-color: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  fill: ${props => {
    if (props.$speaking) {
      return headerBgColor(props);
    }
    return props.$invalid ? '#E53935' : '#4a4a4a';
  }};
  opacity: ${({ disabled, $invalid }) => (disabled && !$invalid ? '.5' : '1')};
  outline: none;
  padding: 14px 16px 12px 16px;
  &:before {
    content: '';
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    animation: ${props =>
      props.$speaking
        ? css`
            ${pulse(headerBgColor(props))} 2s ease infinite
          `
        : ''};
  }
  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

export default SubmitButton;
