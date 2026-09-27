import styled from 'styled-components';
import { themed } from '../theme';

const HeaderTitle = styled.h2`
  font-size: ${themed('headerFontSize')};
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default HeaderTitle;
