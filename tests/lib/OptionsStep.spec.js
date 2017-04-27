import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { OptionsStep } from '../../lib/steps/steps';
import OptionElement from '../../lib/steps/options/OptionElement';

describe('OptionsStep', () => {
  const settings = {
    step: {
      id: '1',
      options: [
        { value: 'op1', label: 'Option 1', target: '2' },
        { value: 'op2', label: 'Option 2', target: '3' },
      ],
      bubbleColor: '#eee',
      fontColor: '#000',
    },
    bubbleStyle: {},
    triggerNextStep: () => {},
  };

  const wrapper = mount(<OptionsStep {...settings} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.hasClass('rsc-os')).to.be.equal(true);
  });

  it('should render 2 options', () => {
    expect(wrapper.find('.rsc-os-option').length).to.be.equal(2);
  });

  it('should render option bubble with background color equal \'#eee\'', () => {
    const background = wrapper.find(OptionElement).first().props().bubbleColor;
    expect(background).to.be.equal('#eee');
  });

  it('should render option bubble with font color equal \'#000\'', () => {
    const fontColor = wrapper.find(OptionElement).first().props().fontColor;
    expect(fontColor).to.be.equal('#000');
  });

  it('should render the first option with label equal \'Option 1\'', () => {
    const label = wrapper.find(OptionElement).first().text();
    expect(label).to.be.equal('Option 1');
  });
});
