import styled from 'styled-components';

const Options = styled.ul<{ $offset: number }>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 2px 0 12px;
  padding: 0 0 0 ${({ $offset }) => $offset}px;
`;

export default Options;
