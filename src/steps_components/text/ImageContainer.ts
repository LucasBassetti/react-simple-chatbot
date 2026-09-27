import styled from 'styled-components';

const ImageContainer = styled.div<{ $user?: boolean }>`
  display: inline-block;
  order: ${({ $user }) => ($user ? '1' : '0')};
  padding: 6px;
`;

export default ImageContainer;
