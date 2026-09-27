import styled from 'styled-components';
import { enterAnimation } from '../../common/animations';
import { themed } from '../../theme';

interface BubbleProps {
  $user?: boolean;
  $isFirst: boolean;
  $isLast: boolean;
}

const userBubbleColor = themed('userBubbleColor');
const botBubbleColor = themed('botBubbleColor');
const userFontColor = themed('userFontColor');
const botFontColor = themed('botFontColor');

// the corners between the messages of a group are smaller, on the side of the author
const LARGE = '18px';
const SMALL = '6px';

const Bubble = styled.div<BubbleProps>`
  ${enterAnimation}
  background: ${props => (props.$user ? userBubbleColor(props) : botBubbleColor(props))};
  border-radius: ${({ $isFirst, $isLast, $user }) => {
    const top = $isFirst ? LARGE : SMALL;
    const bottom = $isLast ? LARGE : SMALL;
    return $user ? `${LARGE} ${top} ${bottom} ${LARGE}` : `${top} ${LARGE} ${LARGE} ${bottom}`;
  }};
  box-shadow: ${({ $user }) =>
    $user ? '0 0 0 1px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.06)' : 'none'};
  box-sizing: border-box;
  color: ${props => (props.$user ? userFontColor(props) : botFontColor(props))};
  font-size: 14px;
  line-height: 1.45;
  max-width: 78%;
  min-width: 0;
  overflow-wrap: anywhere;
  padding: 9px 14px;
  position: relative;
  transform-origin: ${({ $user }) => ($user ? 'top right' : 'top left')};
`;

export default Bubble;
