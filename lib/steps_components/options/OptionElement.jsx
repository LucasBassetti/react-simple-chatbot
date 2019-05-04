import styled from 'styled-components';
import defaultTheme from '../../theme';

const OptionElement = styled.button`
  background: ${({ theme }) => theme.botBubbleColor};
  border: 0;
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${({ theme }) => theme.botFontColor};
  display: inline-block;
  font-size: 14px;
  padding: 12px;

  &:hover {
    opacity: 0.7;
  }
  &:active,
  &:hover:focus {
    outline:none;
  }
`;

OptionElement.defaultProps = {
  theme: defaultTheme
};

export default OptionElement;
