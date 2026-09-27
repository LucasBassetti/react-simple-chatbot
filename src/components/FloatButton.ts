import styled from 'styled-components';
import { themed } from '../theme';

const FloatButton = styled.a<{ $opened: boolean }>`
  align-items: center;
  cursor: pointer;
  background: ${themed('headerBgColor')};
  bottom: 32px;
  border-radius: 100%;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  fill: ${themed('headerFontColor')};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${({ $opened }) => ($opened ? 'scale(0)' : 'scale(1)')};
  transition: transform 0.3s ease;
  width: 56px;
  z-index: 999;
`;

export default FloatButton;
