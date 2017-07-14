import React from 'react';

require('./CustomComponentAPI.css');

const properties = [
  {
    name: 'previousStep',
    type: 'PropTypes.object',
    description: 'Previous step rendered',
  },
  {
    name: 'step',
    type: 'PropTypes.object',
    description: 'Current step rendered',
  },
  {
    name: 'steps',
    type: 'PropTypes.object',
    description: 'All steps rendered',
  },
  {
    name: 'triggerNextStep({ value, trigger })',
    type: 'PropTypes.func',
    description: 'Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered',
  },
];

const CustomComponentAPI = () => (
  <div className="docs-component-3">
    <p>
      When you declare a custom step, you need indicate a custom React Component to be
      rendered in the chat. This custom component will receive the following properties.
    </p>
    <h2 style={{ marginTop: 32 }}>Properties</h2>
    <div className="responsive-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            properties.map((prop) => {
              const { name, type, description } = prop;
              return (
                <tr key={prop.name}>
                  <td className="blue-td">{name}</td>
                  <td className="red-td">{type}</td>
                  <td>{description}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  </div>
);

export default CustomComponentAPI;
