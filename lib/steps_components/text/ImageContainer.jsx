import styled from 'styled-components';
import withConfig from '../../common/withConfig';

const ImageContainer = styled.div.withConfig(withConfig)`
  display: inline-block;
  order: ${props => (props.user ? '1' : '0')};
  padding: 6px;
`;

export default ImageContainer;
