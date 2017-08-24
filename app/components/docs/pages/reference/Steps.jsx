import React, { Component } from 'react';
import _ from 'lodash';

const $ = require('jquery');

require('./Steps.css');

const textStepCode =
`{
  id: '1',
  message: 'Hello World',
  trigger: '2',
},
{
  id: '2',
  message: ({ previousValue, steps }) => 'Hello',
  trigger: ({ value, steps }) => '3',
},
{
  id: '3',
  message: 'Bye',
  end: true,
}
`;

const userStepCode =
`{
  id: '1',
  user: true,
  end: true,
}
`;

const optionsStepCode =
`{
  id: '1',
  options: [
    { value: 1, label: 'Number 1', trigger: '3' },
    { value: 2, label: 'Number 2', trigger: '2' },
    { value: 3, label: 'Number 3', trigger: '2' },
  ],
}
`;

const updateStepCode =
`{
  id: '1',
  update: '2',
  trigger: '3',
}
`;

const customStepCode =
`{
  id: '1',
  component: <CustomComponent />
  trigger: '2'
}
`;

const sections = [
  {
    title: 'Text Step',
    example: textStepCode,
    properties: [
      {
        name: 'id',
        type: 'String | Number',
        required: 'true',
        description: 'The step id. Required for any step',
      },
      {
        name: 'message',
        type: 'String | Function',
        required: 'true',
        description: 'The text message. If function, it will receive ({ previousValue, steps }) params',
      },
      {
        name: 'trigger',
        type: 'String | Number | Function',
        required: 'false',
        description: 'The id of next step to be triggered',
      },
      {
        name: 'avatar',
        type: 'String',
        required: 'false',
        description: 'the avatar to be showed just in this step. Note: this step must be a step that avatar appears',
      },
      {
        name: 'delay',
        type: 'Number',
        required: 'false',
        description: 'set the delay time to message be shown',
      },
      {
        name: 'end',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that this step is the last',
      },
    ],
  },
  {
    title: 'User Step',
    example: userStepCode,
    properties: [
      {
        name: 'id',
        type: 'String | Number',
        required: 'true',
        description: 'The step id. Required for any step',
      },
      {
        name: 'user',
        type: 'Boolean',
        required: 'true',
        description: 'if true indicate that you waiting a user type action',
      },
      {
        name: 'trigger',
        type: 'String | Number | Function',
        required: 'false',
        description: 'The id of next step to be triggered',
      },
      {
        name: 'validator',
        type: 'Function',
        required: 'false',
        description: 'if user attribute is true you can pass a validator function to validate the text typed by the user',
      },
      {
        name: 'end',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that this step is the last',
      },
    ],
  },
  {
    title: 'Options Step',
    example: optionsStepCode,
    properties: [
      {
        name: 'id',
        type: 'String | Number',
        required: 'true',
        description: 'The step id. Required for any step',
      },
      {
        name: 'options',
        type: 'Array',
        required: 'true',
        description: 'Array of options with { label, value, trigger } properties',
      },
      {
        name: 'end',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that this step is the last',
      },
    ],
  },
  {
    title: 'Custom Step',
    example: customStepCode,
    properties: [
      {
        name: 'id',
        type: 'String | Number',
        required: 'true',
        description: 'The step id. Required for any step',
      },
      {
        name: 'component',
        type: 'Component',
        required: 'true',
        description: 'Custom React Component',
      },
      {
        name: 'replace',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that component will be replaced by the next step',
      },
      {
        name: 'waitAction',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that you waiting some action. You must use the triggerNextStep prop in your component to execute the action',
      },
      {
        name: 'asMessage',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that the component will be displayed as a text step',
      },
      {
        name: 'trigger',
        type: 'String | Number | Function',
        required: 'false',
        description: 'The id of next step to be triggered',
      },
      {
        name: 'delay',
        type: 'Number',
        required: 'false',
        description: 'set the delay time to message be shown',
      },
      {
        name: 'end',
        type: 'Boolean',
        required: 'false',
        description: 'if true indicate that this step is the last',
      },
    ],
  },
  {
    title: 'Update Step',
    example: updateStepCode,
    properties: [
      {
        name: 'id',
        type: 'String | Number',
        required: 'true',
        description: 'The step id. Required for any step',
      },
      {
        name: 'update',
        type: 'String | Number',
        required: 'true',
        description: 'The id of next step to be updated',
      },
      {
        name: 'trigger',
        type: 'String | Number | Function',
        required: 'true',
        description: 'The id of next step to be triggered after update',
      },
    ],
  },
];

class Steps extends Component {
  constructor(props) {
    super(props);

    this.renderSections = this.renderSections.bind(this);
  }

  componentDidMount() {
    $('pre code').each((i, block) => {
      hljs.highlightBlock(block);
    });
  }

  renderProperties(prop) {
    const { name, type, required, description } = prop;

    return (
      <tr key={prop.name}>
        <td className="blue-td">{name}</td>
        <td className="red-td">{type}</td>
        <td><code>{required}</code></td>
        <td>{description}</td>
      </tr>
    );
  }

  renderSections(section) {
    return (
      <div
        className="section"
        key={section.title}
      >
        <h2 style={{ marginTop: 32 }}>{section.title}</h2>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {_.map(section.properties, this.renderProperties)}
            </tbody>
          </table>
          <h4 style={{ padding: '6px 12px' }}>Example</h4>
          <pre>
            <code className="jsx">
              {section.example}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="docs-component-2">
        {_.map(sections, this.renderSections)}
      </div>
    );
  }
}

export default Steps;
