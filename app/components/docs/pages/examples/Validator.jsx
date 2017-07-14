import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const exampleCode =
`<ChatBot
  steps={[
    {
      id: '1',
      message: 'Please type a number',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'value should be a number';
        }
        return true;
      },
      trigger: '1',
    },
  ]}
/>
`;

class Validator extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-example-2">
        <ChatBot
          headerTitle="Validator"
          steps={[
            {
              id: '1',
              message: 'Please type a number',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              validator: (value) => {
                if (isNaN(value)) {
                  return 'value should be a number';
                }
                return true;
              },
              trigger: '1',
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

export default Validator;
