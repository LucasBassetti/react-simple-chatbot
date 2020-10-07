import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#F16A22',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#F16A22',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#333333'
};

const steps = [
  {
    id: '1',
    message: 'Hello, need some help?',
    end: true
  }
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <React.StrictMode>
      <ChatBot steps={steps} />
    </React.StrictMode>
  </ThemeProvider>
);

export default ThemedExample;
