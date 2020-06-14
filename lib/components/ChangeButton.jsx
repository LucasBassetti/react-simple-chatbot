import styled from 'styled-components';
import defaultTheme from '../theme';

const ChangeButton = styled.button`
  background-color #EEE;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  height: 26px;
  position: absolute;
  top: 50%;
  left: 5px;
  min-width: 60px;
  outline: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  &:hover {
    opacity: 0.7;
  }
`;

ChangeButton.defaultProps = {
  theme: defaultTheme
};

export default ChangeButton;
