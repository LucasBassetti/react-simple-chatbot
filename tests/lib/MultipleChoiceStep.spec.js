import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MultipleChoiceStep from '../../lib/steps_components/multiple_choice/MultipleChoiceStep';

const ChoiceElementSelector = 'button.rsc-mcs-choice-element';
const SubmitElementSelector = 'button.rsc-mcs-submit-element';

describe('MultipleChoiceStep', () => {
  let chosenChoices = [];

  const props = {
    step: {
      id: '1',
      choices: [
        { value: 'choice1', label: 'Choice 1' },
        { value: 'choice2', label: 'Choice 2' },
        { value: 'choice3', label: 'Choice 3' },
        { value: 'choice4', label: 'Choice 4' },
        { value: 'choice5', label: 'Choice 5' }
      ],
      maxChoices: 3,
      minChoices: 1
    },
    bubbleStyle: {},
    triggerNextStep: choices => {
      chosenChoices = choices;
    }
  };

  // eslint-disable-next-line react/jsx-filename-extension
  const wrapper = mount(<MultipleChoiceStep {...props} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.find(MultipleChoiceStep).length).to.be.equal(1);
  });

  it('should render 5 choices', () => {
    expect(wrapper.find(ChoiceElementSelector).length).to.be.equal(5);
  });

  it("should render the first choice with label equal 'Choice 1'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(0)
      .text();
    expect(label).to.be.equal('Choice 1');
  });

  it("should render the second choice with label equal 'Choice 2'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(1)
      .text();
    expect(label).to.be.equal('Choice 2');
  });

  it("should render the third choice with label equal 'Choice 3'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(2)
      .text();
    expect(label).to.be.equal('Choice 3');
  });

  it("should render the fourth choice with label equal 'Choice 4'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(3)
      .text();
    expect(label).to.be.equal('Choice 4');
  });

  it("should render the fifth choice with label equal 'Choice 5'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(4)
      .text();
    expect(label).to.be.equal('Choice 5');
  });

  it('should render the confirm button', () => {
    expect(wrapper.find(SubmitElementSelector).length).to.equal(1);
  });

  it('should not allow submission with 0 choices selected', () => {
    const submitElement = wrapper.find(SubmitElementSelector);
    submitElement.simulate('click');

    // TODO: Properly check 'chosenChoices', as it takes some time for triggerNextStep() to update it
    expect(chosenChoices.length).to.equal(0);
  });

  it('should allow selecting of only 3 choices', () => {
    const choiceElements = wrapper.find(ChoiceElementSelector);
    choiceElements.at(0).simulate('click');
    choiceElements.at(1).simulate('click');
    choiceElements.at(2).simulate('click');
    choiceElements.at(3).simulate('click');
    choiceElements.at(4).simulate('click');

    wrapper.update();
    const updatedChoiceElements = wrapper.find(ChoiceElementSelector);
    expect(updatedChoiceElements.at(0).text()).to.contain('✓');
    expect(updatedChoiceElements.at(0).hasClass('rsc-mcs-choice-element--selected')).to.equal(true);
    expect(updatedChoiceElements.at(1).text()).to.contain('✓');
    expect(updatedChoiceElements.at(1).hasClass('rsc-mcs-choice-element--selected')).to.equal(true);
    expect(updatedChoiceElements.at(2).text()).to.contain('✓');
    expect(updatedChoiceElements.at(2).hasClass('rsc-mcs-choice-element--selected')).to.equal(true);
    expect(updatedChoiceElements.at(3).text()).to.not.contain('✓');
    expect(updatedChoiceElements.at(3).hasClass('rsc-mcs-choice-element--selected')).to.equal(
      false
    );
    expect(updatedChoiceElements.at(4).text()).to.not.contain('✓');
    expect(updatedChoiceElements.at(4).hasClass('rsc-mcs-choice-element--selected')).to.equal(
      false
    );
  });

  it('should allow deselecting of choices', () => {
    const choiceElements = wrapper.find(ChoiceElementSelector);
    choiceElements.at(1).simulate('click');

    wrapper.update();
    const updatedChoiceElements = wrapper.find(ChoiceElementSelector);
    expect(updatedChoiceElements.at(1).text()).to.not.contain('✓');
    expect(updatedChoiceElements.at(1).hasClass('rsc-mcs-choice-element--selected')).to.equal(
      false
    );
  });

  it('should return chosen choices after confirmation', () => {
    wrapper.find(SubmitElementSelector).simulate('click');
    wrapper.update();

    const chooseIndices = [0, 2];

    // wait until triggerNextStep() populates chosenChoices
    while (!chosenChoices.length);

    const { choices } = props.step;
    const chooseChoices = choices.filter((_, index) => chooseIndices.includes(index));

    for (const choice of chooseChoices) {
      expect(chosenChoices).to.deep.include(choice);
    }
  });

  it('should be disabled after submission', () => {
    const choiceElements = wrapper.find(ChoiceElementSelector);

    choiceElements.at(0).simulate('click');

    wrapper.update();
    const updatedChoiceElements = wrapper.find(ChoiceElementSelector);
    expect(updatedChoiceElements.at(0).text()).to.contain('✓');
  });

  it('should not have submit button after submission', () => {
    expect(wrapper.find(SubmitElementSelector).length).to.equal(0);
  });
});
