import styled from 'styled-components';
import { themed } from '../../theme';
import rgba from '../../common/rgba';

const botBubbleColor = themed('botBubbleColor');

const OptionElement = styled.button`
  background: #fff;
  border: 1px solid ${botBubbleColor};
  border-radius: 999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  color: ${botBubbleColor};
  cursor: pointer;
  display: inline-block;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  padding: 7px 14px;
  text-align: center;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${botBubbleColor};
    color: ${themed('botFontColor')};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${props => rgba(botBubbleColor(props), 0.3)};
    outline: none;
  }
`;

export default OptionElement;
