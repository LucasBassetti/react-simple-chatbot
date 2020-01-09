import React, { Component } from 'react';
import { after, before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { parse } from 'flatted';
import sinon from 'sinon';
import ChatBot from '../../lib/ChatBot';
import { ChatBotContainer, FloatButton, Header, HeaderIcon } from '../../lib/components';
import { CloseIcon } from '../../lib/icons';
import { TextStep } from '../../lib/steps_components';
import { setData } from '../../lib/storage';

// eslint-disable-next-line react/jsx-filename-extension
const CustomComponent = () => <div />;

const removeNewLineChars = str =>
  typeof str === 'string' ? str.replace(/(\r\n|\n|\r)/gm, '') : str;

const ChatBotWithoutDelay = props => (
  <ChatBot botDelay={0} userDelay={0} customDelay={0} {...props} />
);

describe('ChatBot', () => {
  const OptionElementSelector = 'button.rsc-os-option-element';
  const InputElementSelector = 'input.rsc-input';
  const MultipleChoiceElementSelector = 'button.rsc-mcs-choice-element';
  const MultipleSubmitElementSelector = 'button.rsc-mcs-submit-element';

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

    before(done => {
      wrapper.setState({ inputValue: 'test' });
      wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });

      setTimeout(() => {
        wrapper.setState({ inputValue: 'test' });
        wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
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

    it("should render with class 'classname-test'", () => {
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
      <ChatBot
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
          <ChatBot
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
      <ChatBot
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
      expect(wrapper.find(InputElementSelector)).to.have.length(0);
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
      <ChatBot
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
      expect(wrapper.find(InputElementSelector).props().autoComplete).to.be.equal('firstname');
    });
  });

  describe('Update Options', () => {
    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
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
              { value: { fee: 16 }, label: 'Fee: 16', trigger: '8.0d00.f4f7fc513-6505.865edf1f5' },
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

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
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

  describe('Coalesce Input Not Replace', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
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
                label: 'Option A',
                trigger: '5.f745.dc70c5aaf-4010.f36e69ad1'
              },
              {
                value: { fee: 30, days: 1 },
                label: 'Option B',
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
              { value: { fee: 16 }, label: 'Option A', trigger: '8.0d00.f4f7fc513-6505.865edf1f5' },
              { value: { days: 2 }, label: 'Option B', trigger: '8.0d00.f4f7fc513-6505.865edf1f5' }
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

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.be.equal(1);
    });

    it('should present first with 2 options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.be.equal(2);

      options.at(0).simulate('click');
    });

    it('correct output after first choice', () => {
      wrapper.update();
      const expectedTexts = ['Thanks!', 'Fee: 15', 'Days: 3'];
      for (const expectedText of expectedTexts) {
        expect(wrapper.text()).to.contain(expectedText);
      }
    });

    it('should present next with 2 options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.be.equal(2);

      options.at(0).simulate('click');
    });

    it('correct coalesced output after second choice', () => {
      wrapper.update();
      const expectedTexts = ['Thanks!', 'Fee: 16', 'Days: 3'];
      for (const expectedText of expectedTexts) {
        expect(wrapper.text()).to.contain(expectedText);
      }
    });
  });

  describe('Objects in Message', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            '@class': '.OptionsStep',
            id: '{variables}',
            options: [
              {
                value: { fee: 15, days: 3 },
                label: 'fee: 15 & days: 3',
                trigger: 'last'
              },
              {
                value: { fee: 30, days: 1 },
                label: 'fee: 30 & days: 1',
                trigger: 'last'
              }
            ]
          },
          {
            '@class': '.TextStep',
            id: 'last',
            message: 'Thanks! {variables}',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should allow selecting selecting options', () => {
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(2);

      options.at(0).simulate('click');
    });

    it('should render objects in message correctly', () => {
      expect(removeNewLineChars(wrapper.text())).to.contain('( "fee": 15, "days": 3)');
    });
  });

  describe('Nested variables Input', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            '@class': '.OptionsStep',
            id: '{variables}',
            options: [
              {
                value: { fee: 15, days: 3 },
                label: 'fee: 15 & days: 3',
                trigger: '{variables.property}'
              },
              {
                value: { fee: 30, days: 1 },
                label: 'fee: 30 & days: 1',
                trigger: '{variables.property}'
              }
            ]
          },
          {
            '@class': '.UserStep',
            id: '{variables.property}',
            user: true,
            trigger: 'display'
          },
          {
            '@class': '.TextStep',
            id: 'display',
            message: 'Thanks! {variables}',
            trigger: '{variables.property2}'
          },
          {
            '@class': '.OptionsStep',
            id: '{variables.property2}',
            options: [
              {
                value: { property3: 'value' },
                label: 'Property 3',
                trigger: 'last'
              },
              {
                value: { property4: 'value' },
                label: 'Property4',
                trigger: 'last'
              }
            ]
          },
          {
            '@class': '.TextStep',
            id: 'last',
            message: 'Updated! {variables}',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should allow selecting options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(2);

      options.at(0).simulate('click');
    });

    it('should allow inserting values', () => {
      wrapper.update();
      wrapper.setState({ inputValue: 'value' });
      wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
    });

    it('should render nested inputted values in message correctly', () => {
      wrapper.update();
      expect(removeNewLineChars(wrapper.text())).to.contain(
        '( "fee": 15, "days": 3, "property": "value")'
      );
    });

    it('should allow selecting options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(2);

      options.at(0).simulate('click');
    });

    it('should render nested options in message correctly', () => {
      wrapper.update();
      expect(removeNewLineChars(wrapper.text())).to.contain(
        '( "fee": 15, "days": 3, "property": "value", "property2": (  "property3": "value" ))'
      );
    });
  });

  describe('Nested variables Output', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            '@class': '.OptionsStep',
            id: '{variables}',
            options: [
              {
                value: {
                  property1: 'value1',
                  property2: {
                    property3: 'value3'
                  }
                },
                label: 'Option 1',
                trigger: 'last'
              }
            ]
          },
          {
            '@class': '.TextStep',
            id: 'last',
            message: 'Property1: {variables.property1}, Property3: {variables.property2.property3}',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should allow selecting options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(1);

      options.at(0).simulate('click');
    });

    it('should output nested variables in message correctly', () => {
      wrapper.update();
      expect(removeNewLineChars(wrapper.text())).to.contain('Property1: value1, Property3: value3');
    });
  });

  describe('Options with same values', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            id: 'gender',
            options: [
              { value: 'a', label: 'Male', trigger: 'end' },
              { value: 'a', label: 'Female', trigger: 'end' }
            ]
          },
          {
            id: 'end',
            message: 'Thanks! Your data was submitted successfully!',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should allow selecting options', () => {
      wrapper.update();
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(2);

      options.at(1).simulate('click'); // Female
    });

    it('should render 2nd options text', () => {
      wrapper.update();
      const bubbles = wrapper.find(TextStep);
      expect(bubbles.at(0).text()).to.be.equal('Female');
    });
  });

  describe('Eval expression', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            '@class': '.TextStep',
            id: '1',
            message: 'Enter your salary!',
            trigger: '{salary}'
          },
          {
            '@class': '.UserStep',
            id: '{salary}',
            user: true,
            trigger: 'display'
          },
          {
            '@class': '.TextStep',
            id: 'display',
            evalExpression: 'values["{salary}"] = "$" + previousValues["{salary}"]',
            message: 'Your salary is {salary}',
            trigger: 'assign-variable-without-optionstep'
          },
          {
            '@class': '.TextStep',
            id: 'assign-variable-without-optionstep',
            evalExpression: 'values["{variable}"] = "value"',
            message: 'Assigning value to variable',
            trigger: 'display-variable'
          },
          {
            '@class': '.TextStep',
            id: 'display-variable',
            message: 'The variable is {variable}',
            trigger: 'check-evalExpression-precedence'
          },
          {
            '@class': '.TextStep',
            id: 'check-evalExpression-precedence',
            evalExpression: 'values["{person}"] = { name: "FirstName LastName", age: 34 }',
            message: 'Your name is {person.name} and you are {person.age} years old',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should allow inserting values', () => {
      wrapper.update();
      wrapper.setState({ inputValue: '1000' });
      wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
    });

    it('should update the entered value', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('Your salary is $1000');
    });

    it('should allow new variables to be created', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('The variable is value');
    });

    it('should evaluate evalExpression before rendering step', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('Your name is FirstName LastName and you are 34 years old');
    });
  });

  describe('Multiple choices chat', () => {
    const wrapper = mount(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            '@class': '.TextStep',
            id: '1',
            message: 'Which fruits would you like?!',
            trigger: '{choices}'
          },
          {
            '@class': '.ChoiceStep',
            id: '{choices}',
            choices: [
              {
                label: 'Apple',
                value: 'apple'
              },
              {
                label: 'Banana',
                value: 'banana'
              },
              {
                label: 'Orange',
                value: 'orange'
              }
            ],
            trigger: ({ value }) => {
              if (
                value.includes('apple') &&
                value.includes('orange') &&
                !value.includes('banana')
              ) {
                return 'AppleAndOrange';
              }
              return 'InvalidChoices';
            }
          },
          {
            '@class': '.TextStep',
            id: 'InvalidChoices',
            message: 'The valid choice would have been Apple and Orange',
            trigger: 'EndMessage'
          },
          {
            '@class': '.TextStep',
            id: 'AppleAndOrange',
            message: 'Apple and Orange chosen',
            trigger: 'EndMessage'
          },
          {
            '@class': '.TextStep',
            id: 'EndMessage',
            message: 'First choice: {choices}',
            end: true
          }
        ]}
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should ask with 3 choices', () => {
      wrapper.update();
      const choices = wrapper.find(MultipleChoiceElementSelector);
      expect(choices.length).to.equal(3);

      // choose Apple and Orange
      choices.at(0).simulate('click');
      choices.at(2).simulate('click');
    });

    it('should have 1 submit button', () => {
      wrapper.update();
      const submitElement = wrapper.find(MultipleSubmitElementSelector);

      // submit
      submitElement.simulate('click');
    });

    it('should replace MultipleChoiceStep with TextStep', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('Apple, Orange');
    });

    it('should show proper text after choices selection', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('Apple and Orange chosen');
    });

    it('should store data in step', () => {
      wrapper.update();
      expect(wrapper.text()).to.contain('First choice: [\n "apple",\n "orange"\n]');
    });
  });

  describe('Reloading of chat (using cache)', () => {
    describe('Reloading at OptionStep', () => {
      const cacheName = 'reload-at-optionstep';

      const steps = [
        {
          '@class': '.TextStep',
          id: '1',
          message: 'Choose an option',
          trigger: '{choice}'
        },
        {
          '@class': '.UserStep',
          id: '{choice}',
          options: [
            {
              label: 'Choice 1',
              value: 'choice1',
              trigger: 'display'
            },
            {
              label: 'Choice 2',
              value: 'choice2',
              trigger: 'display'
            }
          ]
        },
        {
          '@class': '.TextStep',
          id: 'display',
          message: 'You chose {choice}',
          end: true
        }
      ];
      const chatBot = (
        <ChatBot
          cache
          cacheName={cacheName}
          botDelay={0}
          userDelay={0}
          customDelay={0}
          steps={steps}
        />
      );

      let wrapper;
      let clock;

      before(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(chatBot);
      });

      // required as each UI update takes time
      beforeEach(done => {
        clock.tick(200);
        wrapper.update();
        done();
      });

      after(() => {
        clock.restore();
      });

      it('should render', () => {
        expect(wrapper.find(ChatBot).length).to.equal(1);
      });

      it('should show options properly after reloading', () => {
        wrapper = mount(chatBot);
        wrapper.update();

        const options = wrapper.find(OptionElementSelector);
        expect(options.length).to.equal(2);
        expect(options.at(0).text()).to.equal('Choice 1');
        expect(options.at(1).text()).to.equal('Choice 2');

        options.at(0).simulate('click');
      });

      it('should work properly after reloaded option is selected', () => {
        wrapper.update();
        expect(wrapper.text()).to.contain('Choice 1');
        expect(wrapper.text()).to.contain('You chose choice1');
      });

      it('should still be rendering', () => {
        expect(wrapper.find(ChatBot).length).to.equal(1);
      });
    });

    describe('Reloading at UserStep', () => {
      const cacheName = 'reload-at-userstep';

      const validator = value => {
        const numericalValue = Number(value.substring(1));
        if (value.substring(0, 1) !== '$' || Number.isNaN(numericalValue)) {
          return 'Please enter salary amount in number with $ sign';
        }
        return true;
      };

      const parser = value => {
        return Number(value.substring(1));
      };

      const chatBot = (
        <ChatBot
          cache
          cacheName={cacheName}
          botDelay={0}
          userDelay={0}
          customDelay={0}
          steps={[
            {
              '@class': '.TextStep',
              id: '1',
              message: 'Enter your salary!',
              trigger: '{salary}'
            },
            {
              '@class': '.UserStep',
              id: '{salary}',
              user: true,
              validator,
              parser,
              trigger: 'display'
            },
            {
              '@class': '.TextStep',
              id: 'display',
              message: 'Your salary is {salary}',
              end: true
            }
          ]}
        />
      );

      let wrapper;
      let clock;

      before(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(chatBot);
      });

      // required as each UI update takes time
      beforeEach(done => {
        clock.tick(200);
        wrapper.update();
        done();
      });

      after(() => {
        clock.restore();
      });

      it('should render', () => {
        expect(wrapper.find(ChatBot).length).to.equal(1);
      });

      it('should reload properly', () => {
        wrapper = mount(chatBot); // reload

        wrapper.update();
      });

      it('should disallow entering numbers without $: validator should work sign after reload', () => {
        wrapper.update();
        wrapper.setState({ inputValue: '200' });
        wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
        wrapper.update();

        expect(wrapper.state().inputValue).to.equal(
          'Please enter salary amount in number with $ sign'
        );
      });

      it('should disallow entering non-numbers: validator should work after reload', () => {
        wrapper.update();
        wrapper.setState({ inputValue: '$ Two hundred' });
        wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
        wrapper.update();

        expect(wrapper.state().inputValue).to.equal(
          'Please enter salary amount in number with $ sign'
        );
      });

      it('should allow entering proper number with $ sign: validator should work after reload', () => {
        wrapper.update();
        wrapper.setState({ inputValue: '$ 100' });
        wrapper.find(InputElementSelector).simulate('keyPress', { key: 'Enter' });
        wrapper.update();

        expect(wrapper.state().inputValue).to.equal('');
      });

      it('should show proper output: parser should work after reload', () => {
        wrapper.update();

        expect(wrapper.text()).to.contain('Your salary is 100');
      });

      it('should still be rendering', () => {
        expect(wrapper.find(ChatBot).length).to.equal(1);
      });
    });

    describe('Reloading at TextStep', () => {
      const cacheName = 'reload-at-textstep';

      const steps = [
        {
          '@class': '.TextStep',
          id: '1',
          message: 'First message',
          trigger: '2'
        },
        {
          '@class': '.TextStep',
          id: '2',
          message: 'Second message',
          end: true
        }
      ];

      const chatBot = (
        <ChatBot
          cache
          cacheName={cacheName}
          botDelay={0}
          userDelay={0}
          customDelay={0}
          steps={steps}
        />
      );

      let wrapper;
      let clock;

      before(() => {
        clock = sinon.useFakeTimers();

        const state = {
          currentStep: {
            '@class': '.TextStep',
            id: '1',
            key: 'GnVGFdK84RGxhy1m6uvQWxAr',
            message: 'First message',
            trigger: '2'
          },
          previousStep: {},
          previousSteps: [
            {
              '@class': '.TextStep',
              id: '1',
              key: 'GnVGFdK84RGxhy1m6uvQWxAr',
              message: 'First message',
              trigger: '2'
            }
          ],
          renderedSteps: [
            {
              '@class': '.TextStep',
              id: '1',
              key: 'GnVGFdK84RGxhy1m6uvQWxAr',
              message: 'First message',
              trigger: '2'
            }
          ]
        };

        setData(cacheName, state);

        wrapper = mount(chatBot);
      });

      after(() => {
        clock.restore();
      });

      it('should render', () => {
        expect(wrapper.find(ChatBot).length).to.equal(1);
      });

      it('should continue rendering on reload', () => {
        wrapper.update();
        clock.tick(100);
        expect(wrapper.text()).to.contain('First message');
        expect(wrapper.text()).to.contain('Second message');
      });
    });
  });

  describe('Extra control', () => {
    const CustomControl = () => (
      <button type="button" className="my-button">
        custom
      </button>
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
      />
    );

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should be rendered with an extra control beside submit button', () => {
      expect(wrapper.find('div.rsc-controls button.my-button')).to.have.length(1);
    });

    it('the extra control should be hidden', () => {
      wrapper.setState({ inputValue: 'test' });
      wrapper.find('input.rsc-input').simulate('keyPress', { key: 'Enter' });
      clock.tick(500);
      expect(wrapper.find('div.rsc-controls button.my-button')).to.have.length(0);
    });
  });

  describe('Last option step can be an end step', () => {
    const steps = [
      {
        id: '1',
        options: [
          {
            label: 'Option Label',
            value: ''
          }
        ],
        end: true
      }
    ];

    const chatBot = <ChatBot botDelay={0} userDelay={0} customDelay={0} steps={steps} />;

    const wrapper = mount(chatBot);

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should have one option', () => {
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(1);
      expect(options.at(0).text()).to.equal('Option Label');

      options.at(0).simulate('click');
    });

    it('should replace OptionsStep with TextStep', () => {
      expect(wrapper.find(OptionElementSelector).length).to.equal(0);
      const replacer = wrapper.find(TextStep);
      expect(replacer.length).to.equal(1);
      expect(replacer.text()).to.equal('Option Label');
    });

    it('should still be rendering', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });
  });

  describe('UpdateSteps can assign end to steps', () => {
    const steps = [
      {
        id: '1',
        message: 'First message',
        trigger: 'update-step'
      },
      {
        id: 'update-step',
        update: 'step',
        end: true // this doesn't stop the chat
      },
      {
        id: 'step',
        message: 'Last message',
        trigger: 'should-not-be-triggered'
      },
      {
        id: 'should-not-be-triggered',
        message: 'This should not be triggered'
      }
    ];

    const chatBot = <ChatBot botDelay={0} userDelay={0} customDelay={0} steps={steps} />;

    const wrapper = mount(chatBot);

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('should render upto last message', () => {
      expect(wrapper.text()).to.contain('Last message');
      expect(wrapper.text()).to.not.contain('This should not be triggered');
    });
  });

  describe('Option with no trigger', () => {
    const steps = [
      {
        id: '1',
        options: [
          {
            label: 'End',
            value: ''
          },
          {
            label: 'Do not end',
            value: '',
            trigger: 'next-step'
          }
        ]
      },
      {
        id: 'next-step',
        message: 'This is next step. This should not have triggered'
      }
    ];

    const chatBot = <ChatBot botDelay={0} userDelay={0} customDelay={0} steps={steps} />;

    const wrapper = mount(chatBot);

    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      wrapper.update();
      done();
    });

    after(() => {
      clock.restore();
    });

    it('Chat should render', () => {
      expect(wrapper.find(ChatBot).length).to.equal(1);
    });

    it('Chat should have two option', () => {
      const options = wrapper.find(OptionElementSelector);
      expect(options.length).to.equal(2);
      expect(options.at(0).text()).to.equal('End');

      options.at(0).simulate('click');
    });

    it('should assign end property to last replaced step', () => {
      const renderedSteps = wrapper.find(ChatBot).state('renderedSteps');
      const lastStep = renderedSteps[renderedSteps.length - 1];

      expect(lastStep.message).to.equal('End');
      // eslint-disable-next-line no-unused-expressions
      expect(lastStep.end).to.be.true;
    });
  });

  describe('Read-only chat', () => {
    let clock;

    before(() => {
      clock = sinon.useFakeTimers();
    });

    // required as each UI update takes time
    beforeEach(done => {
      clock.tick(200);
      done();
    });

    after(() => {
      clock.restore();
    });

    let wrapper;

    it('should disable Options on read-only', () => {
      wrapper = mount(
        <ChatBotWithoutDelay
          readOnly
          steps={[
            {
              id: '1',
              options: [
                {
                  label: 'Option',
                  value: '',
                  trigger: 'end'
                }
              ]
            },
            {
              id: 'end',
              message: 'This is next step. This should not have triggered'
            }
          ]}
        />
      );

      clock.tick(150);
      const options = wrapper.find(OptionElementSelector);

      options.at(0).simulate('click');

      clock.tick(150);
      expect(wrapper.find(OptionElementSelector).length).to.equal(1);
    });

    it('should disable MultipleChoices on read-only', done => {
      wrapper = mount(
        <ChatBotWithoutDelay
          readOnly
          steps={[
            {
              id: '1',
              choices: [
                {
                  label: 'Choice',
                  value: ''
                }
              ],
              trigger: 'end'
            },
            {
              id: 'end',
              message: 'This is next step. This should not have triggered'
            }
          ]}
        />
      );

      clock.tick(150);
      const choices = wrapper.find(MultipleChoiceElementSelector);
      const submitButton = wrapper.find(MultipleSubmitElementSelector);

      choices.at(0).simulate('click');
      submitButton.at(0).simulate('click');

      clock.tick(200);
      expect(wrapper.find(MultipleChoiceElementSelector).length).to.equal(1);
      done();
    });
  });
});
