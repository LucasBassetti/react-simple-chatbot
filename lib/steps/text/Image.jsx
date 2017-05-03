import styled from 'styled-components';
import { scale } from '../../common/animations';

const Image = styled.img`
  animation: ${scale} .3s ease forwards;
  border: 1px solid #ddd;
  border-radius: ${props => props.user ? '50% 50% 50% 0' : '50% 50% 0 50%'};
  height: 40px;
  min-width: 40px;
  padding: 2px;
  transform: scale(0);
  transform-origin: ${props => props.user ? 'bottom left' : 'bottom right'};
  width: 40;
`;

export default Image;
