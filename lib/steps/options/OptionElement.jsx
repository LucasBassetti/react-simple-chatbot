import styled from 'styled-components';

const OptionElement = styled.a`
  background: ${props => props.user
    ? props.theme.userBubbleColor
    : props.theme.botBubbleColor};
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${props => props.user
    ? props.theme.userFontColor
    : props.theme.botFontColor};
  display: inline-block;
  padding: 12px;

  &:hover { opacity: .7; }
`;

OptionElement.defaultProps = {
  theme: {
    botBubbleColor: '#6E48AA',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  },
};

export default OptionElement;
