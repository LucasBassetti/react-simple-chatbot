import React, { Component } from 'react';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ChatBot from '../../lib/ChatBot';
import ChatBotContainer from '../../lib/ChatBotContainer';
import FloatButton from '../../lib/FloatButton';
import Header from '../../lib/Header';
import HeaderIcon from '../../lib/HeaderIcon';
import { CloseIcon } from '../../lib/icons';
import { TextStep, OptionsStep, CustomStep } from '../../lib/steps';

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
            trigger: 'update',
          },
          {
            id: 'update',
            update: 'user',
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
              { value: 'op1', label: 'Option 1', trigger: '6' },
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
      wrapper.find('.rsc-input').simulate('keyPress', { key: 'Enter' });

      setTimeout(() => {
        wrapper.setState({ inputValue: 'test' });
        wrapper.find('.rsc-input').simulate('keyPress', { key: 'Enter' });
      }, 100);

      setTimeout(() => {
        done();
      }, 500);
    });

    after(() => {
      wrapper.unmount();
    });

    it('should render', () => {
      expect(wrapper.hasClass('rsc')).to.be.equal(true);
    });

    it('should render with class \'classname-test\'', () => {
      expect(wrapper.hasClass('classname-test')).to.be.equal(true);
    });

    it('should render a header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
    });

    it('should render a custom step', () => {
      expect(wrapper.find(CustomStep)).to.have.length(1);
    });

    it('should render a options step', () => {
      expect(wrapper.find(OptionsStep)).to.have.length(1);
    });

    it('should render 5 texts steps', () => {
      wrapper.find('.rsc-os-option-element').first().simulate('click');
      expect(wrapper.find(TextStep)).to.have.length(5);
    });
  });

  describe('No Header', () => {
    const wrapper = mount(
      <ChatBot
        hideHeader={true}
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => {}}
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
        handleEnd={() => {}}
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
        userDelay={0}
        customDelay={0}
        handleEnd={() => {}}
        steps={[
          {
            id: '1',
            message: 'Hello World',
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
            opened={opened}
            toggleFloating={this.toggleFloating}
            botDelay={0}
            userDelay={0}
            customDelay={0}
            handleEnd={() => {}}
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
  });
});
