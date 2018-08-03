import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { OptionsStep } from '../../lib/steps_components';
import OptionElement from '../../lib/steps_components/options/OptionElement';

describe('OptionsStep', () => {
  const settings = {
    step: {
      id: '1',
      options: [
        { value: 'op1', label: 'Option 1', target: '2' },
        { value: 'op2', label: 'Option 2', target: '3' },
      ],
      // bubbleColor: '#eee',
      // fontColor: '#000',
    },
    bubbleStyle: {},
    triggerNextStep: () => {},
  };

  const wrapper = mount(<OptionsStep {...settings} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.find(OptionsStep).length).to.be.equal(1);
  });

  it('should render 2 options', () => {
    expect(wrapper.find(OptionElement).length).to.be.equal(2);
  });

  it('should render the first option with label equal \'Option 1\'', () => {
    const label = wrapper.find(OptionElement).first().text();
    expect(label).to.be.equal('Option 1');
  });
});
