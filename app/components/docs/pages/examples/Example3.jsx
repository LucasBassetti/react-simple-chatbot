import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const exampleCode =
`<ChatBot
  steps={[
    {
      id: '1',
      message: 'You can add custom components',
      trigger: '2',
    },
    {
      id: '2',
      component: (
        <div> This is a example component </div>
      ),
      end: true,
    },
  ]}
/>
`;

class Example3 extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-example-3">
        <ChatBot
          headerTitle="Custom Component"
          steps={[
            {
              id: '1',
              message: 'You can add custom components',
              trigger: '2',
            },
            {
              id: '2',
              component: (
                <div> This is a example component </div>
              ),
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

export default Example3;
