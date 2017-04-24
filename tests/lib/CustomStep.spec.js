import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { CustomStep } from '../../lib/steps/steps';
import CustomStepContainer from '../../lib/steps/custom/CustomStepContainer';

const Example = () => (
  <div className="example">
    Example
  </div>
);

describe('CustomStep', () => {
  const steps = {
    step1: {
      id: '1',
      component: <Example />,
    },
  };
  const step = steps.step1;
  const settings = {
    step,
    steps,
    style: {
      border: 0,
    },
    previousStep: step,
    triggerNextStep: () => {},
  };

  const wrapper = mount(<CustomStep {...settings} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.hasClass('rsc-cs')).to.be.equal(true);
    expect(wrapper.find(CustomStepContainer)).to.have.length(1);
  });

  it('should render with Example component', () => {
    expect(wrapper.find(Example)).to.have.length(1);
  });
});
