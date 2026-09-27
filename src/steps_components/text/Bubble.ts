import styled from 'styled-components';
import { scale } from '../../common/animations';
import { themed } from '../../theme';

interface BubbleProps {
  $user?: boolean;
  $showAvatar: boolean;
  $isFirst: boolean;
  $isLast: boolean;
}

const userBubbleColor = themed('userBubbleColor');
const botBubbleColor = themed('botBubbleColor');
const userFontColor = themed('userFontColor');
const botFontColor = themed('botFontColor');

const Bubble = styled.div<BubbleProps>`
  animation: ${scale} 0.3s ease forwards;
  background: ${props => (props.$user ? userBubbleColor(props) : botBubbleColor(props))};
  border-radius: ${({ $isFirst, $isLast, $user }) => {
    if (!$isFirst && !$isLast) {
      return $user ? '18px 0 0 18px' : '0 18px 18px 0px';
    }

    if (!$isFirst && $isLast) {
      return $user ? '18px 0 18px 18px' : '0 18px 18px 18px';
    }

    return $user ? '18px 18px 0 18px' : '18px 18px 18px 0';
  }};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${props => (props.$user ? userFontColor(props) : botFontColor(props))};
  display: inline-block;
  font-size: 14px;
  max-width: 50%;
  margin: ${({ $isFirst, $showAvatar, $user }) => {
    if (!$isFirst && $showAvatar) {
      return $user ? '-8px 46px 10px 0' : '-8px 0 10px 46px';
    }

    if (!$isFirst && !$showAvatar) {
      return $user ? '-8px 0px 10px 0' : '-8px 0 10px 0px';
    }

    return '0 0 10px 0';
  }};
  overflow: hidden;
  position: relative;
  padding: 12px;
  transform: scale(0);
  transform-origin: ${({ $isFirst, $user }) => {
    if ($isFirst) {
      return $user ? 'bottom right' : 'bottom left';
    }

    return $user ? 'top right' : 'top left';
  }};
`;

export default Bubble;
