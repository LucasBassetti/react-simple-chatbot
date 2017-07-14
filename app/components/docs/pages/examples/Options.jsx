import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const exampleCode =
`<ChatBot
    steps={[
      {
        id: '1',
        message: 'What number I am thinking?',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Number 1', trigger: '4' },
          { value: 2, label: 'Number 2', trigger: '3' },
          { value: 3, label: 'Number 3', trigger: '3' },
        ],
      },
      {
        id: '3',
        message: 'Wrong answer, try again.',
        trigger: '2',
      },
      {
        id: '4',
        message: 'Awesome! You are a telepath!',
        end: true,
      },
    ]}
  />
`;

class Options extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-example-1">
        <ChatBot
          headerTitle="Options"
          steps={[
            {
              id: '1',
              message: 'What number I am thinking?',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: 1, label: 'Number 1', trigger: '4' },
                { value: 2, label: 'Number 2', trigger: '3' },
                { value: 3, label: 'Number 3', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'Wrong answer, try again.',
              trigger: '2',
            },
            {
              id: '4',
              message: 'Awesome! You are a telepath!',
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

export default Options;
