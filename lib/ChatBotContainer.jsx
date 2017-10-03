import styled from 'styled-components';
import defaultTheme from './theme';

const ChatBotContainer = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  font-family: ${({ theme }) => theme.fontFamily};
  overflow: hidden;
  position: ${props => props.floating ? 'fixed' : 'relative'};
  bottom: ${props => props.floating ? '32px' : 'initial'};
  right: ${props => props.floating ? '32px' : 'initial'};
  width: ${props => props.width};
  z-index: 999;
  transform: ${props => props.opened ? 'scale(1)' : 'scale(0)'};
  transform-origin: bottom right;
  transition: transform .3s ease;

  @media screen and (max-width: 568px) {
    border-radius: ${props => props.floating ? '0' : ''};
    bottom: 0;
    height: 100%;
    right: 0;
    width: 100%;
  }
`;

ChatBotContainer.defaultProps = {
  theme: defaultTheme,
};

export default ChatBotContainer;
