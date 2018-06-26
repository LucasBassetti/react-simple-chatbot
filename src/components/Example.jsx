import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const acceptedFileTypes = [
  'image/png',
  'image/jpeg',
];

const steps = [
  {
    id: '1',
    message: 'Hello, What\'s your name?',
    trigger: '2',
  },
  {
    id: '2',
    trigger: '3',
    enableFiles: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      }
      return true;
    },
    user: true
  },
  {
    id: '3',
    message: 'Nice to meet you, by',
    end: true
  }
];

const handleEnd = ({ steps, values }) => {
  // console.log(steps);
  // console.log(values);
  console.log(values);
}

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot
      steps={steps}
      acceptedFileTypes={acceptedFileTypes}
      handleEnd={handleEnd}
    />
  </ThemeProvider>
);

export default ThemedExample;
