import React from 'react';
import ChatBot from '../../lib/index';

const Example = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Hello World',
        end: true,
      },
    ]}
  />
);

export default Example;
