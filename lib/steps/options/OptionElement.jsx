import styled from 'styled-components';

const OptionElement = styled.a`
  background: ${props => props.bubbleColor};
  border-radius: 22px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: ${props => props.fontColor};
  display: inline-block;
  padding: 12px;

  &:hover { opacity: .7; }
`;

export default OptionElement;
