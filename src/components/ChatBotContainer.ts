import type { CSSProperties } from 'react';
import styled from 'styled-components';
import { themed } from '../theme';

interface ChatBotContainerProps {
  $floating: boolean;
  $floatingStyle: CSSProperties;
  $opened: boolean;
  $width: string;
  $height: string;
}

const ChatBotContainer = styled.div<ChatBotContainerProps>`
  background: ${themed('background')};
  border-radius: 16px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 12px 40px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  font-family: ${themed('fontFamily')};
  font-size: 14px;
  line-height: 1.45;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  position: ${({ $floating }) => ($floating ? 'fixed' : 'relative')};
  bottom: ${({ $floating, $floatingStyle }) =>
    $floating ? $floatingStyle.bottom || '32px' : 'initial'};
  top: ${({ $floating, $floatingStyle }) =>
    $floating ? $floatingStyle.top || 'initial' : 'initial'};
  right: ${({ $floating, $floatingStyle }) =>
    $floating ? $floatingStyle.right || '32px' : 'initial'};
  left: ${({ $floating, $floatingStyle }) =>
    $floating ? $floatingStyle.left || 'initial' : 'initial'};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  z-index: 999;
  transform: ${({ $opened }) => ($opened ? 'scale(1)' : 'scale(0)')};
  transform-origin: ${({ $floatingStyle }) => $floatingStyle.transformOrigin || 'bottom right'};
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);

  @media screen and (max-width: 568px) {
    border-radius: ${({ $floating }) => ($floating ? '0' : '')};
    bottom: 0 !important;
    left: initial !important;
    height: 100%;
    right: 0 !important;
    top: initial !important;
    width: 100%;
  }
`;

export default ChatBotContainer;
