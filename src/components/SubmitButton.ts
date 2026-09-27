import styled, { css } from 'styled-components';
import { themed } from '../theme';
import { pulse } from '../common/animations';
import rgba from '../common/rgba';

interface SubmitButtonProps {
  $invalid: boolean;
  $speaking: boolean;
}

const accent = themed('headerBgColor');

const SubmitButton = styled.button<SubmitButtonProps>`
  align-items: center;
  background-color: ${props => (props.$speaking ? rgba(accent(props), 0.12) : 'transparent')};
  border: 0;
  border-radius: 50%;
  box-shadow: none;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  fill: ${props => {
    if (props.$invalid) {
      return '#dc2626';
    }
    return props.disabled ? '#9ca3af' : accent(props);
  }};
  height: 40px;
  justify-content: center;
  margin: 8px;
  outline: none;
  padding: 0;
  position: relative;
  transition:
    background-color 0.15s ease,
    fill 0.15s ease;
  width: 40px;

  &:before {
    animation: ${props =>
      props.$speaking
        ? css`
            ${pulse(accent(props))} 2s ease infinite
          `
        : 'none'};
    border-radius: 50%;
    content: '';
    inset: 0;
    position: absolute;
  }

  &:not(:disabled):hover {
    background-color: ${props => rgba(accent(props), 0.1)};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${accent};
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

export default SubmitButton;
