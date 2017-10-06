import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const themeCode = `
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];

const ThemedExample = () => (
  <ThemeProvider theme={theme}>
    <ChatBot steps={steps} />;
  </ThemeProvider>
);

export default ThemedExample;
`;

const $ = require('jquery');

class Themes extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    const theme = {
      background: '#f5f8fb',
      fontFamily: 'Helvetica Neue',
      headerBgColor: '#EF6C00',
      headerFontColor: '#fff',
      botBubbleColor: '#EF6C00',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };

    const steps = [
      {
        id: '1',
        message: 'Hello World',
        end: true,
      },
    ];

    return (
      <ThemeProvider theme={theme}>
        <div className="docs-theme">
          <p>Personalize your chatbot defining a theme for it.</p>
          <ChatBot steps={steps} />
          <pre>
            <code className="bash">
              { themeCode }
            </code>
          </pre>
        </div>
      </ThemeProvider>
    );
  }
}

export default Themes;
