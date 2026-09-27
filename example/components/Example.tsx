import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot, { type ChatBotTheme, type CustomComponentProps, type Step } from '../../src';

const otherFontTheme: ChatBotTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const Summary = ({ steps }: CustomComponentProps) => (
  <div>
    <strong>{steps?.name.value}</strong> likes <strong>{steps?.fruit.value}</strong>
  </div>
);

const steps: Step[] = [
  { id: '1', message: 'Hello! What is your name?', trigger: 'name' },
  { id: 'name', user: true, trigger: '3' },
  { id: '3', message: 'Hi {previousValue}! Which fruit do you like?', trigger: 'fruit' },
  {
    id: 'fruit',
    options: [
      { label: 'Apple', trigger: 'summary' },
      { label: 'Banana', trigger: 'summary' }
    ]
  },
  { id: 'summary', component: <Summary />, asMessage: true, trigger: 'end' },
  { id: 'end', message: 'Thanks!', end: true }
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot steps={steps} />
  </ThemeProvider>
);

export default ThemedExample;
