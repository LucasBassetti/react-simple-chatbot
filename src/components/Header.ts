import styled from 'styled-components';
import { themed } from '../theme';

const Header = styled.div`
  align-items: center;
  background: ${themed('headerBgColor')};
  color: ${themed('headerFontColor')};
  display: flex;
  fill: ${themed('headerFontColor')};
  height: 56px;
  justify-content: space-between;
  padding: 0 10px;
`;

export default Header;
