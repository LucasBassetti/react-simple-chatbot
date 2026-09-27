import styled from 'styled-components';

const TextStepContainer = styled.div<{ $user?: boolean }>`
  align-items: flex-end;
  display: flex;
  justify-content: ${({ $user }) => ($user ? 'flex-end' : 'flex-start')};
`;

export default TextStepContainer;
