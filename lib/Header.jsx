import styled from 'styled-components';

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
  theme: {
    headerBgColor: '#6e48aa',
    headerFontColor: '#fff',
  },
};

export default Header;
