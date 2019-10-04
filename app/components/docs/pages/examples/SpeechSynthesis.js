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
      metadata: {
        speak: 'Hi {previousValue}. Note that I am saying something different then the messsage text'
      },
      trigger: '4',
    },
    {
      id: '4',
      component: (
        <div>This is a custom component </div>
      ),
      delay: 4000,
      metadata: {
        speak: 'I can also say something about a custom component'
      },
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
              metadata: {
                speak: 'Hi {previousValue}. Note that I am saying something different then the messsage text'
              },
              trigger: '4',
            },
            {
              id: '4',
              component: (
                <div>This is an custom component </div>
              ),
              delay: 4000,
              metadata: {
                speak: 'I can also say something about a custom component'
              },
              end: true,
            },
          ]}
        />
        <h3 style={{ marginTop: 20 }}>Note</h3>
        <p>
          Adding speak to metadata will make the chatbot say that custom phrase insted of the message.<br />
          For custom components metadata.speak is the only way to get the chatbot to speak.
        </p>
        <h3 >Code</h3>
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
