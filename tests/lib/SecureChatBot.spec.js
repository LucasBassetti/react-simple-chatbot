import React, { Component } from 'react';
import { after, before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { parse } from 'flatted';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import sinon from 'sinon';
import SecureChatBot from '../../lib/SecureChatBot';
import { ChatBotContainer, FloatButton, Header, HeaderIcon } from '../../lib/components';
import { CloseIcon } from '../../lib/icons';
import { TextStep } from '../../lib/steps_components';

// eslint-disable-next-line react/jsx-filename-extension
const CustomComponent = () => <div />;

describe('SecureChatBot', () => {
  const OptionElementSelector = 'button.rsc-os-option-element';
  const InputElementSelector = 'input.rsc-input';

  describe('Simple', () => {
    let wrapper;
    let clock;
    let axiosMock;

    before(async () => {
      const nextStepUrl = 'api';

      clock = sinon.useFakeTimers();
      axiosMock = new MockAdapter(axios);
      wrapper = mount(
        <SecureChatBot
          className="classname-test"
          botDelay={0}
          userDelay={0}
          customDelay={0}
          handleEnd={() => {}}
          nextStepUrl={nextStepUrl}
          steps={[
            {
              id: '1',
              message: 'Hello World',
              trigger: 'user'
            },
            {
              id: 'user',
              user: true,
              trigger: 'update'
            },
            {
              id: 'update',
              update: 'user',
              trigger: () => '2'
            },
            {
              id: '2',
              component: <CustomComponent />,
              trigger: '3'
            },
            {
              id: '3',
              component: <CustomComponent />,
              asMessage: true,
              trigger: '4'
            },
            {
              id: '4',
              component: <CustomComponent />,
              replace: true,
              trigger: '5'
            },
            {
              id: '5',
              options: [
                { value: 'op1', label: 'Option 1', trigger: () => '6' },
                { value: 'op2', label: 'Option 2', trigger: '6' }
              ]
            },
            {
              id: '6',
              message: 'Bye!',
              end: true
            }
          ]}
        />
      );
      axiosMock
        .onGet(nextStepUrl, {
          params: {
            stepId: 'user',
            value: 'test'
          }
        })
        .reply(200, {
          id: 'user',
          user: true,
          trigger: 'update'
        });

      axiosMock
        .onGet(nextStepUrl, {
          params: {
            stepId: 'user'
          }
        })
        .replyOnce(200, {
          id: 'user',
          user: true,
          trigger: 'update'
        });

      await clock.runAllAsync();
      wrapper.setState({ inputValue: 'test' });
      wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });

      await clock.runAllAsync();
      wrapper.setState({ inputValue: 'test' });
      wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });

      await clock.runAllAsync();
    });

    after(() => {
      axiosMock.restore();
      wrapper.unmount();
    });

    it('should render', () => {
      expect(wrapper.find(SecureChatBot).length).to.be.equal(1);
    });

    it("should render with class 'classname-test'", () => {
      expect(wrapper.hasClass('classname-test')).to.be.equal(true);
    });

    it('should render a header', () => {
      expect(wrapper.find(Header)).to.have.length(1);
    });
  });

  describe('No Header', () => {
    const wrapper = mount(
      <SecureChatBot
        hideHeader
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => {}}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            end: true
          }
        ]}
      />
    );

    it('should be rendered without header', () => {
      expect(wrapper.find(Header)).to.have.length(0);
    });
  });

  describe('Custom Header', () => {
    const wrapper = mount(
      <SecureChatBot
        headerComponent={<div className="header-component" />}
        botDelay={0}
        userDelay={0}
        customDelay={0}
        handleEnd={() => {}}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            end: true
          }
        ]}
      />
    );

    it('should be rendered with a custom header', () => {
      expect(wrapper.find('.header-component')).to.have.length(1);
      expect(wrapper.find(Header)).to.have.length(0);
    });
  });

  describe('Floating', () => {
    const wrapper = mount(
      <SecureChatBot
        floating
        botDelay={0}
        cache
        userDelay={0}
        customDelay={0}
        handleEnd={() => {}}
        steps={[
          {
            id: '1',
            message: 'Hello World',
            trigger: '2'
          },
          {
            id: '2',
            message: () => 'Bye',
            end: true
          }
        ]}
      />
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
          opened: true
        };

        this.toggleFloating = this.toggleFloating.bind(this);
      }

      toggleFloating({ opened }) {
        this.setState({ opened });
      }

      render() {
        const { opened } = this.state;
        return (
          <SecureChatBot
            floating
            floatingStyle={{
              left: '32px',
              right: 'initial',
              transformOrigin: 'bottom left'
            }}
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
                end: true
              }
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
      expect(wrapper.find(ChatBotContainer).prop('floatingStyle').transformOrigin).to.be.equal(
        'bottom left'
      );
    });
  });

  describe('Hide Input', () => {
    const wrapper = mount(
      <SecureChatBot
        steps={[
          {
            id: '1',
            message: 'Hide Input',
            hideInput: true,
            end: true
          }
        ]}
      />
    );

    it('should be rendered without input', () => {
      wrapper.update();
      expect(wrapper.find(InputElementSelector)).to.have.length(0);
    });
  });

  describe('Metadata', () => {
    const wrapper = mount(
      <SecureChatBot
        botDelay={0}
        steps={[
          {
            id: '1',
            message: 'Set metadata!',
            metadata: {
              custom: 'Hello World'
            },
            trigger: '2'
          },
          {
            id: '2',
            message: params => params.steps[1].metadata.custom,
            end: true
          }
        ]}
      />
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
      <SecureChatBot
        steps={[
          {
            id: '1',
            message: 'Hide Input',
            inputAttributes: {
              autoComplete: 'firstname'
            },
            end: true
          }
        ]}
      />
    );

    it("should be rendered with input to autocomplete on 'firstname'", () => {
      wrapper.update();
      expect(wrapper.find(InputElementSelector).props().autoComplete).to.be.equal('firstname');
    });
  });

  describe('Update Options', () => {
    let clock;
    let wrapper;
    let axiosMock;

    before(async () => {
      const nextStepUrl = 'api';

      clock = sinon.useFakeTimers();

      wrapper = await mount(
        <SecureChatBot
          botDelay={0}
          userDelay={0}
          customDelay={0}
          nextStepUrl={nextStepUrl}
          steps={[
            {
              '@class': '.TextStep',
              id: '1',
              message: 'Hello!',
              trigger: '2.f745.dc70c5aaf-4010.f36e69ad1'
            },
            {
              '@class': '.TextStep',
              id: '2.f745.dc70c5aaf-4010.f36e69ad1',
              message: 'Choose one!',
              trigger: '{variables}'
            },
            {
              '@class': '.OptionsStep',
              id: '{variables}',
              options: [
                {
                  value: { fee: 15, days: 3 },
                  label: 'Fee: 15 & Days: 3',
                  trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
                },
                {
                  value: { fee: 30, days: 1 },
                  label: 'Fee: 30 & Days: 1',
                  trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
                }
              ]
            },
            {
              '@class': '.TextStep',
              id: '5.f745.dc70c5aaf-4010.f36e69ad1',
              message: 'Thanks!\nFee: {variables.fee}\nDays: {variables.days}',
              trigger: '6.0d00.f4f7fc513-6505.865edf1f5'
            },
            {
              '@class': '.TextStep',
              id: '6.0d00.f4f7fc513-6505.865edf1f5',
              message: 'Choose again!',
              trigger: '2bcc4b03-f23e-337c-9830-fe430d69901b'
            },
            {
              '@class': '.UpdateOptionsStep',
              id: '2bcc4b03-f23e-337c-9830-fe430d69901b',
              update: '{variables}',
              updateOptions: [
                {
                  value: { fee: 16 },
                  label: 'Fee: 16',
                  trigger: '8.0d00.f4f7fc513-6505.865edf1f5'
                },
                { value: { days: 2 }, label: 'Days: 2', trigger: '8.0d00.f4f7fc513-6505.865edf1f5' }
              ]
            },
            {
              '@class': '.TextStep',
              id: '8.0d00.f4f7fc513-6505.865edf1f5',
              message: 'Thanks!\nFee: {variables.fee}\nDays: {variables.days}',
              end: true
            }
          ]}
        />
      );

      axiosMock = new MockAdapter(axios);
      axiosMock
        .onGet(nextStepUrl, {
          params: {
            stepId: '{variables}',
            value: {
              fee: 30,
              days: 1
            }
          }
        })
        .replyOnce(200, {
          '@class': '.TextStep',
          id: '{variables}',
          message: 'Fee: 15 & Days: 3',
          trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
        });

      axiosMock
        .onGet(nextStepUrl, {
          params: {
            stepId: '{variables}'
          }
        })
        .reply(200, {
          '@class': '.OptionsStep',
          id: '{variables}',
          options: [
            {
              value: { fee: 15, days: 3 },
              label: 'Fee: 15 & Days: 3',
              trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
            },
            {
              value: { fee: 30, days: 1 },
              label: 'Fee: 30 & Days: 1',
              trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
            }
          ]
        });

      axiosMock
        .onGet(nextStepUrl, {
          params: {
            stepId: '{variables}',
            value: { fee: 16 }
          }
        })
        .replyOnce(200, {
          '@class': '.TextStep',
          id: '{variables}',
          message: 'Fee: 16 & Days: 3',
          trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
        });
    });

    // required as each UI update takes time
    beforeEach(async () => {
      await clock.runAllAsync();
      wrapper.update();
    });

    after(() => {
      clock.restore();
      axiosMock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(SecureChatBot).length).to.equal(1);
    });

    it('should have two options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.be.equal(2);
    });

    it('options should be correct', () => {
      const options = wrapper.find(OptionElementSelector);
      const expectedTexts = ['Fee: 15 & Days: 3', 'Fee: 30 & Days: 1'];
      for (const expectedText of expectedTexts) {
        expect(wrapper.text()).to.contain(expectedText);
      }

      options.at(1).simulate('click');
    });

    it('should have two options, after selection', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.be.equal(2);
    });

    it('options should be correct, after selection', () => {
      const options = wrapper.find(OptionElementSelector);
      const expectedTexts = ['Fee: 16', 'Days: 2'];
      for (const expectedText of expectedTexts) {
        expect(wrapper.text()).to.contain(expectedText);
      }

      options.at(0).simulate('click');
    });
  });
});
