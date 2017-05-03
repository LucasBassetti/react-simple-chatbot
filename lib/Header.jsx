import styled from 'styled-components';

const Header = styled.div`
  align-items: center;
  background: ${props => props.headerBgColor};
  color: ${props => props.headerFontColor};
  display: flex;
  fill: ${props => props.headerFontColor};
  height: 56px;
  justify-content: space-between;
  padding: 0 10px;
`;

export default Header;
