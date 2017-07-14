import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const $ = require('jquery');

const exampleCode =
`class EndCallback extends Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    // console.log(steps);
    // console.log(values);
    alert(\`Chat handleEnd callback! Number: \${values[0]}\`);
  }

  render() {
    return (
      <div className="docs-example-1">
        <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'Pick a number',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: '1', label: '1', trigger: '3' },
                { value: '2', label: '2', trigger: '3' },
                { value: '3', label: '3', trigger: '3' },
                { value: '4', label: '4', trigger: '3' },
                { value: '5', label: '5', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'A callback message was called!',
              end: true,
            },
          ]}
        />
      </div>
    );
  }
}

export default EndCallback;
`;

class EndCallback extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });

    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    // console.log(steps);
    // console.log(values);
    setTimeout(() => {
      alert(`Chat handleEnd callback! Number: ${values[0]}`);
    }, 100);
  }

  render() {
    return (
      <div className="docs-example-1">
        <ChatBot
          headerTitle="End Callback"
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'Pick a number',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: '1', label: '1', trigger: '3' },
                { value: '2', label: '2', trigger: '3' },
                { value: '3', label: '3', trigger: '3' },
                { value: '4', label: '4', trigger: '3' },
                { value: '5', label: '5', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'A callback message was called!',
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

export default EndCallback;
