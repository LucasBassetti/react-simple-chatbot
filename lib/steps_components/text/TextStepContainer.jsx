import styled from 'styled-components';
import withConfig from '../../common/withConfig';

const TextStepContainer = styled.div.withConfig(withConfig)`
  align-items: flex-end;
  display: flex;
  justify-content: ${props => (props.user ? 'flex-end' : 'flex-start')};
`;

export default TextStepContainer;
