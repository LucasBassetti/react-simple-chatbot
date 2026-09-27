import styled from 'styled-components';

interface ContentProps {
  $floating: boolean;
  $height: string;
  $hideInput?: boolean;
}

const Content = styled.div<ContentProps>`
  height: calc(
    ${({ $height }) => $height} - ${({ $hideInput }) => ($hideInput ? '56px' : '112px')}
  );
  overflow-y: scroll;
  margin-top: 2px;
  padding-top: 6px;

  @media screen and (max-width: 568px) {
    height: ${({ $floating }) => ($floating ? 'calc(100% - 112px)' : '')};
  }
`;

export default Content;
