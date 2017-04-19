import React from 'react';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ChatBot from '../../lib/ChatBot';
import { TextStep, OptionsStep, CustomStep } from '../../lib/steps/steps';

const CustomComponent = () => (
  <div />
);

describe('ChatBot', () => {
  const wrapper = mount(
    <ChatBot
      delay={0}
      audio={false}
      handleEnd={() => {}}
      steps={[
        {
          id: '1',
          message: 'Hello World',
          trigger: 'user',
        },
        {
          id: 'user',
          user: true,
          trigger: '2',
        },
        {
          id: '2',
          component: <CustomComponent />,
          trigger: '3',
        },
        {
          id: '3',
          component: <CustomComponent />,
          replace: true,
          trigger: '4',
        },
        {
          id: '4',
          options: [
            { value: 'op1', label: 'Option 1', trigger: '5' },
            { value: 'op2', label: 'Option 2', trigger: '5' },
          ],
        },
        {
          id: '5',
          message: 'Bye!',
          end: true,
        },
      ]}
    />,
  );

  before((done) => {
    wrapper.setState({ inputValue: 'test' });
    wrapper.find('.chat-input').simulate('keyPress', { key: 'Enter' });

    setTimeout(() => {
      done();
    }, 100);
  });

  it('should render', () => {
    expect(wrapper.hasClass('simple-chatbot')).to.be.equal(true);
  });

  it('should render a custom step', () => {
    expect(wrapper.find(CustomStep)).to.have.length(1);
  });

  it('should render a options step', () => {
    expect(wrapper.find(OptionsStep)).to.have.length(1);
  });

  it('should render 3 texts steps', () => {
    wrapper.find('.option-element').first().simulate('click');
    expect(wrapper.find(TextStep)).to.have.length(3);
  });
});
