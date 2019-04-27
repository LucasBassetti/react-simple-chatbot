import React, { Component } from 'react';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ChatBot from '../../lib/ChatBot';
import {
  ChatBotContainer,
  FloatButton,
  Header,
  HeaderIcon,
} from '../../lib/components';
import { CloseIcon } from '../../lib/icons';
import { TextStep } from '../../lib/steps_components';

import { parse } from 'flatted';

const CustomComponent = () => (
  <div />
);

describe('ChatBot', () => {
  describe('Simple', () => {
    const wrapper = mount(
      <ChatBot
        className="classname-test"
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => { }}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            trigger: 'user',
          },
          {
            id: 'user',
            user: true,
            trigger: 'update',
          },
          {
            id: 'update',
            update: 'user',
            trigger: () => '2',
          },
          {
            id: '2',
            component: <CustomComponent />,
            trigger: '3',
          },
          {
            id: '3',
            component: <CustomComponent />,
            asMessage: true,
            trigger: '4',
          },
          {
            id: '4',
            component: <CustomComponent />,
            replace: true,
            trigger: '5',
          },
          {
            id: '5',
            options: [
              { value: 'op1', label: 'Option 1', trigger: () => '6' },
              { value: 'op2', label: 'Option 2', trigger: '6' },
            ],
          },
          {
            id: '6',
            message: 'Bye!',
            end: true,
          },
        ]}
      />,
    );

    before((done) => {
      wrapper.setState({ inputValue: 'test' });
      wrapper.find('input.rsc-input').simulate('keyPress', { key: 'Enter' });

      setTimeout(() => {
        wrapper.setState({ inputValue: 'test' });
        wrapper.find('input.rsc-input').simulate('keyPress', { key: 'Enter' });
      }, 100);

      setTimeout(() => {
        done();
      }, 500);
    });

    after(() => {
      wrapper.unmount();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.be.equal(1);
    });

    it('should render with class \'classname-test\'', () => {
      expect(wrapper.hasClass('classname-test')).to.be.equal(true);
    });

    it('should render a header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
    });

    // it('should render a custom step', () => {
    //   expect(wrapper.find(CustomStep)).to.have.length(1);
    // });
    //
    // it('should render a options step', () => {
    //   expect(wrapper.find(OptionsStep)).to.have.length(1);
    // });
    //
    // it('should render 5 texts steps', () => {
    //   wrapper.find('.rsc-os-option-element').first().simulate('click');
    //   expect(wrapper.find(TextStep)).to.have.length(5);
    // });
  });

  describe('No Header', () => {
    const wrapper = mount(
      <ChatBot
        hideHeader={true}
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => { }}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            end: true,
          },
        ]}
      />,
    );

    it('should be rendered without header', () => {
      expect(wrapper.find(Header)).to.have.length(0);
    });
  });

  describe('Custom Header', () => {
    const wrapper = mount(
      <ChatBot
        headerComponent={<div className="header-component" />}
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => { }}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            end: true,
          },
        ]}
      />,
    );

    it('should be rendered with a custom header', () => {
      expect(wrapper.find('.header-component')).to.have.length(1);
      expect(wrapper.find(Header)).to.have.length(0);
    });
  });

  describe('Floating', () => {
    const wrapper = mount(
      <ChatBot
        floating={true}
        botDelay={0}
        cache={true}
        userDelay={0}
        customDelay={0}
        handleEnd={() => { }}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            trigger: '2',
          },
          {
            id: '2',
            message: () => 'Bye',
            end: true,
          },
        ]}
      />,
    );

    it('should be rendered with floating header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
      expect(wrapper.find(CloseIcon)).to.have.length(1);
    });

    it('should be rendered with a floating button', () => {
      expect(wrapper.find(FloatButton)).to.have.length(1);
    });

    it('should opened the chat when click on floating button', () => {
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(false);
      wrapper.find(FloatButton).simulate('click');
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(true);
    });

    it('should cache the steps', () => {
      const data = parse(localStorage.getItem('rsc_cache'));
      expect(data.renderedSteps.length).to.be.equal(2);
    });
  });

  describe('Floating - Custom Opened', () => {
    class FloatingExample extends Component {
      constructor(props) {
        super(props);

        this.state = {
          opened: true,
        };

        this.toggleFloating = this.toggleFloating.bind(this);
      }

      toggleFloating({ opened }) {
        this.setState({ opened });
      }

      render() {
        const { opened } = this.state;
        return (
          <ChatBot
            floating={true}
            floatingStyle={{
              left: '32px',
              right: 'initial',
              transformOrigin: 'bottom left',
            }}
            opened={opened}
            toggleFloating={this.toggleFloating}
            botDelay={0}
            userDelay={0}
            customDelay={0}
            handleEnd={() => { }}
            steps={[
              {
                id: '1',
                message: 'Hello World',
                end: true,
              },
            ]}
          />
        );
      }
    }

    const wrapper = mount(<FloatingExample />);

    it('should be rendered with floating header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
      expect(wrapper.find(CloseIcon)).to.have.length(1);
    });

    it('should be rendered with a opened equal true', () => {
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(true);
    });

    it('should close the chat when click on close button', () => {
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(true);
      wrapper.find(HeaderIcon).simulate('click');
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(false);
    });

    it('should opened the chat when click on floating button', () => {
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(false);
      wrapper.find(FloatButton).simulate('click');
      expect(wrapper.find(ChatBotContainer).props().opened).to.be.equal(true);
    });

    it('should modify the transform-origin style in chatbot container', () => {
      expect(wrapper.find(ChatBotContainer).prop('floatingStyle').left).to.be.equal('32px');
      expect(wrapper.find(ChatBotContainer).prop('floatingStyle').right).to.be.equal('initial');
      expect(wrapper.find(ChatBotContainer).prop('floatingStyle').transformOrigin).to.be.equal('bottom left');
    });
  });

  describe('Hide Input', () => {
    const wrapper = mount(
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Hide Input',
            hideInput: true,
            end: true,
          },
        ]}
      />,
    );

    it('should be rendered without input', () => {
      expect(wrapper.find('input.rsc-input')).to.have.length(0);
    });
  });

  describe('Metadata', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        steps={[
          {
            id: '1',
            message: 'Set metadata!',
            metadata: {
              custom: 'Hello World',
            },
            trigger: '2',
          },
          {
            id: '2',
            message: params => (params.steps[1].metadata.custom),
            end: true,
          },
        ]}
      />,
    );

    before(() => {
      // Somehow it needs something like this, to wait for the application to be rendered.
      // TODO: improve this...
      wrapper.simulate('keyPress', { key: 'Enter' });
    });

    after(() => {
      wrapper.unmount();
    });

    it('should be accessible in "steps" and "previousStep"', () => {
      const bubbles = wrapper.find(TextStep);
      const step2Bubble = bubbles.at(1);
      expect(step2Bubble.props().previousStep.metadata.custom).to.be.equal('Hello World');
      expect(step2Bubble.props().steps[1].metadata.custom).to.be.equal('Hello World');
    });

    it('should render in second bubble', () => {
      const bubbles = wrapper.find(TextStep);
      const step2Bubble = bubbles.at(1);
      expect(step2Bubble.text()).to.be.equal('Hello World');
    });
  });

  describe('Input Attributes', () => {
    const wrapper = mount(
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Hide Input',
            inputAttributes: {
              autoComplete: 'firstname',
            },
            end: true,
          },
        ]}
      />,
    );

    it('should be rendered with input to autocomplete on \'firstname\'', () => {
      expect(wrapper.find('input.rsc-input').props().autoComplete).to.be.equal('firstname');
    });
  });
  
  describe('Extra control', () => {
    const CustomControl = () => (
      <button className="my-button">custom</button>
    );
    const wrapper = mount(
      <ChatBot
        botDelay={10}
        userDelay={10}
        customDelay={10}
        extraControl={<CustomControl />}
        steps={[
          {
            id: '1',
            user: true,
            hideExtraControl: false,
            trigger: '2'
          },
          {
            id: '2',
            user: true,
            hideExtraControl: true,
            trigger: '3'
          },
          {
            id: '3',
            message: 'end',
            end: true
          }
        ]}
      />,
    );

    it('should be rendered with an extra control beside submit button', () => {
      expect(wrapper.find('div.rsc-controls button.my-button')).to.have.length(1);
    });

    it('the extra control should be hidden', () => {
      console.log("Setting input value");
      wrapper.setState({ inputValue: 'test' });
      console.log("Simulate key press");
      wrapper.find('input.rsc-input').simulate('keyPress', { key: 'Enter' });
      setTimeout(() => {
        console.log("testing hidden");
        expect(wrapper.find('div.rsc-controls button.my-button')).to.have.length(0);  
      }, 500);
    });

  });
});
