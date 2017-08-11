import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Test = () => (
  <div>test</div>
);

const steps = [
  {
    id: '1',
    message: 'Hello World',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'test', label: 'test', trigger: '3' },
    ],
  },
  {
    id: '3',
    component: <Test />,
    trigger: '22',
  },
  {
    id: '22',
    user: true,
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 'test', label: 'test', trigger: '3' },
      { value: 'test2', label: 'end', trigger: '5' },
    ],
  },
  {
    id: '5',
    message: 'Hi',
    end: true,
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot cache={true} floating={true} steps={steps} />
  </ThemeProvider>
);

export default ThemedExample;
