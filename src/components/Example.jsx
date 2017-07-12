import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const darkTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
};

const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];

const Example = () =>
  <ChatBot steps={steps} />;

const ThemedExample = () => (
  <ThemeProvider theme={darkTheme}>
    <Example />
  </ThemeProvider>
);

export default ThemedExample;
