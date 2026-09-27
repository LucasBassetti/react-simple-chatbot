import styled from 'styled-components';
import { enterAnimation } from '../../common/animations';

const Image = styled.img`
  ${enterAnimation}
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: block;
  height: 32px;
  max-width: none;
  object-fit: cover;
  padding: 3px;
  width: 32px;
`;

export default Image;
