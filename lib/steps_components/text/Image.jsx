import { scale } from '../../common/animations';
import styled from 'styled-components';

const Image = styled.img.attrs({
  width: '150',
  height: '150'
})`
  animation: ${scale} 0.3s ease forwards;
  border-radius: ${props => (props.user ? '50% 50% 50% 0' : '50% 50% 0 50%')};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
  height: 40px;
  min-width: 40px;
  padding: 3px;
  transform: scale(0);
  transform-origin: ${props => (props.user ? 'bottom left' : 'bottom right')};
  width: 40;
`;

export default Image;
