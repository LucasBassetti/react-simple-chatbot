import styled from 'styled-components';

interface ContentProps {
  $floating: boolean;
  $height: string;
  $hideInput?: boolean;
}

const Content = styled.div<ContentProps>`
  box-sizing: border-box;
  height: calc(
    ${({ $height }) => $height} - ${({ $hideInput }) => ($hideInput ? '56px' : '112px')}
  );
  overflow-y: auto;
  /* reserve the scrollbar space, so the messages don't wrap again when it appears */
  scrollbar-gutter: stable;
  overscroll-behavior: contain;
  padding: 16px 12px 8px;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  scrollbar-width: thin;

  @media screen and (max-width: 568px) {
    height: ${({ $floating }) => ($floating ? 'calc(100% - 112px)' : '')};
  }
`;

export default Content;
