import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CustomStep } from '../../../lib/steps/steps';

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

  const wrapper = shallow(<CustomStep {...settings} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.hasClass('custom-step')).to.be.equal(true);
  });

  it('should render without border', () => {
    expect(wrapper.find('.custom-step').prop('style').border).to.be.equal(0);
  });

  it('should render with Example component', () => {
    expect(wrapper.find(Example)).to.have.length(1);
  });
});
