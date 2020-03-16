import styled from 'styled-components';
import { scale } from '../../common/animations';

const Image = styled.img`
  animation: ${scale} 0.3s ease forwards;
  border-radius: ${props => (props.user ? '50% 50% 50% 0' : '50% 50% 0 50%')};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  height: 40px;
  min-width: 40px;
  padding: 3px;
  transform: ${({ animated }) => (animated ? `scale(0)` : `scale(100%)`)};
  transform-origin: ${props => (props.user ? 'bottom left' : 'bottom right')};
  width: 40;
`;

Image.defaultProps = {
  animated: true
};

export default Image;
