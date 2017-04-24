import styled from 'styled-components';

const OptionElement = styled.a`
  background: ${props => props.bubbleColor};
  border-radius: 22px;
  color: ${props => props.fontColor};
  padding: 12px;

  &:hover { opacity: .7; }
`;

export default OptionElement;
