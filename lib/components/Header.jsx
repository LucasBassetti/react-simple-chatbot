import styled from 'styled-components';
import defaultTheme from '../theme';

const Header = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.headerBgColor};
  color: ${({ theme }) => theme.headerFontColor};
  display: flex;
  fill: ${({ theme }) => theme.headerFontColor};
  height: 56px;
  justify-content: space-between;
  padding: 0 10px;
`;

Header.defaultProps = {
  theme: defaultTheme
};

export default Header;
