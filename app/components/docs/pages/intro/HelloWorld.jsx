import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const helloWorldCode =
`import ChatBot from 'react-simple-chatbot';

<ChatBot
  steps={[
    {
      id: 'hello-world',
      message: 'Hello World!',
      end: true,
    },
  ]}
/>
`;

class HelloWorld extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-hello-world">
        <p>Check the hello world code</p>
        <pre>
          <code>
            { helloWorldCode }
          </code>
        </pre>
        <p>Result</p>
        <ChatBot
          steps={[
            {
              id: 'hello-world',
              message: 'Hello World!',
              end: true,
            },
          ]}
        />
      </div>
    );
  }
}

export default HelloWorld;
