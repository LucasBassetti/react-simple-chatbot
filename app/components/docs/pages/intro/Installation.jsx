import React, { Component } from 'react';

const installationCode = 'npm install react-simple-chatbot --save';
const impportCode = 'import ChatBot from \'react-simple-chatbot\';';

const $ = require('jquery');

class Installation extends Component {
  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div className="docs-installation">
        <p>Run the following commands in your terminal</p>
        <pre>
          <code className="bash">
            { installationCode }
          </code>
        </pre>
        <p>Importing</p>
        <pre>
          <code className="jsx">
            { impportCode }
          </code>
        </pre>
      </div>
    );
  }
}

export default Installation;
