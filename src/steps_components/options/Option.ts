import styled from 'styled-components';
import { enterAnimation } from '../../common/animations';

const Option = styled.li`
  ${enterAnimation}
  display: block;
  margin: 0;
  padding: 0;
`;

export default Option;
