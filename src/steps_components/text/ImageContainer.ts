import styled from 'styled-components';

// keeps the column of the avatar, so the messages of a group stay aligned
const ImageContainer = styled.div`
  box-sizing: border-box;
  flex: 0 0 32px;
  height: 32px;
  /* centered on the first line of the message */
  margin-top: 4px;
  width: 32px;
`;

export default ImageContainer;
