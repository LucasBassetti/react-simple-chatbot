import styled, { keyframes } from 'styled-components';
import { rgba } from './common/rgba';
import defaultTheme from './theme';

const fillFunc = (props) => {
  const { speaking, invalid, theme } = props;

  if (speaking) {
    return theme.headerBgColor;
  }
  return invalid ? '#E53935' : '#4a4a4a';
};

const pulse = color => keyframes`
  0% { box-shadow: 0 0 0 0 ${rgba(color, 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${rgba(color, 0)}; }
  100% { box-shadow: 0 0 0 0 ${rgba(color, 0)}; }
`;

const SubmitButton = styled.button`
  background-color: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  fill: ${fillFunc};
  opacity: ${props => (props.disabled && !props.invalid ? '.5' : '1')};
  outline: none;
  padding: 14px 16px 12px 16px;
  position: absolute;
  right: 0;
  top: 0;
  &:before {
    content: '';
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 50%;
    animation: ${({ theme, speaking }) =>
      speaking ? `${pulse(theme.headerBgColor)} 2s ease infinite` : ''};
  }
  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

SubmitButton.defaultProps = {
  theme: defaultTheme,
};

export default SubmitButton;
