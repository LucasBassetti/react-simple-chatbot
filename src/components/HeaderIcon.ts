import styled from 'styled-components';

const HeaderIcon = styled.a`
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  transition: background-color 0.15s ease;
  width: 36px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

export default HeaderIcon;
