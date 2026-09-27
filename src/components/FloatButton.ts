import styled from 'styled-components';
import { themed } from '../theme';

const FloatButton = styled.a<{ $opened: boolean }>`
  align-items: center;
  cursor: pointer;
  background: ${themed('headerBgColor')};
  bottom: 32px;
  border-radius: 50%;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 8px 24px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
  display: flex;
  fill: ${themed('headerFontColor')};
  height: 56px;
  justify-content: center;
  position: fixed;
  right: 32px;
  transform: ${({ $opened }) => ($opened ? 'scale(0)' : 'scale(1)')};
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 56px;
  z-index: 999;

  &:hover {
    transform: ${({ $opened }) => ($opened ? 'scale(0)' : 'scale(1.06)')};
  }

  &:focus-visible {
    outline: 3px solid ${themed('headerBgColor')};
    outline-offset: 3px;
  }
`;

export default FloatButton;
