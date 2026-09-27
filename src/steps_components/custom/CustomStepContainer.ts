import styled from 'styled-components';
import { enterAnimation } from '../../common/animations';

// aligned with the messages of the bot, next to its avatar
const CustomStepContainer = styled.div<{ $offset: number }>`
  ${enterAnimation}
  background: #fff;
  border-radius: 14px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 0 12px ${({ $offset }) => $offset}px;
  overflow-wrap: anywhere;
  padding: 16px;
`;

export default CustomStepContainer;
