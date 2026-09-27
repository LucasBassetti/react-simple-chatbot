import styled from 'styled-components';
import { themed } from '../theme';

const Header = styled.div`
  align-items: center;
  background: ${themed('headerBgColor')};
  box-sizing: border-box;
  color: ${themed('headerFontColor')};
  display: flex;
  fill: ${themed('headerFontColor')};
  flex-shrink: 0;
  gap: 8px;
  height: 56px;
  justify-content: space-between;
  padding: 0 8px 0 16px;
`;

export default Header;
