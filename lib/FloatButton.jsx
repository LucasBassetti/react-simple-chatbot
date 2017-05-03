import styled from 'styled-components';

const FloatButton = styled.a`
  align-items: center;
  cursor: pointer;
  background: ${props => props.headerBgColor};
  bottom: 32px;
  border-radius: 100%;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  fill: ${props => props.headerFontColor};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${props => props.opened ? 'scale(0)' : 'scale(1)'};
  transition: transform .3s ease;
  width: 56px;
  z-index: 999;
`;

export default FloatButton;
