import React from 'react';
import ChatBot from '../../lib/index';

import { ThemeProvider } from 'styled-components';

const darkTheme = {
  background: '#000',
  fontFamily: 'Helvetica Neue',
};

const Example = () =>
  <ThemeProvider theme={darkTheme}>
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Hello World',
          end: true,
        },
      ]}
    />
  </ThemeProvider>;

export default Example;
