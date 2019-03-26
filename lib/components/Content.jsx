import styled from 'styled-components';

const Content = styled.div`
  height: calc(${props => props.height} - ${props => (props.hideInput ? '56px' : '112px')});
  overflow-y: scroll;
  margin-top: 2px;
  padding-top: 6px;

  @media screen and (max-width: 568px) {
    height: ${props => (props.floating ? 'calc(100% - 112px)' : '')};
  }
`;

export default Content;
