import styled from 'styled-components';

interface TextStepContainerProps {
  $user?: boolean;
  $isLast: boolean;
}

const TextStepContainer = styled.div<TextStepContainerProps>`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${({ $user }) => ($user ? 'row-reverse' : 'row')};
  gap: 8px;
  margin-bottom: ${({ $isLast }) => ($isLast ? '12px' : '2px')};
`;

export default TextStepContainer;
