import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import '../helpers/setup';
import ChatBot from '../../lib/ChatBot';
import { TextStep } from '../../lib/steps/steps';

describe('ChatBot', () => {
  const wrapper = shallow(
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Hello World',
          end: true,
        },
      ]}
    />,
  );

  it('should render', () => {
    expect(wrapper.hasClass('simple-chatbot')).to.be.equal(true);
  });

  it('should render a text step', () => {
    expect(wrapper.find(TextStep)).to.have.length(1);
  });
});
