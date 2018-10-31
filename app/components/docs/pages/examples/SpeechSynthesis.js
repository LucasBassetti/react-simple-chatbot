import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const exampleCode =
`<ChatBot
  headerTitle="Speech Synthesis"
  speechSynthesis={{ enable: true, lang: 'en' }}
  steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    },
  ]}
/>
`;

class SpeechRecognition extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-example-3">
        <ChatBot
          headerTitle="Speech Synthesis"
          speechSynthesis={{ enable: true, lang: 'en' }}
          steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}, nice to meet you!',
              end: true,
            },
          ]}
        />
        <h3 style={{ marginTop: 20 }}>Code</h3>
        <pre>
          <code className="jsx">
            {exampleCode}
          </code>
        </pre>
      </div>
    );
  }
}

export default SpeechRecognition;
