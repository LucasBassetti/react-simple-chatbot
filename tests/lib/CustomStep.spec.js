import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { CustomStep } from '../../lib/steps_components';
import CustomStepContainer from '../../lib/steps_components/custom/CustomStepContainer';

const Example = () => (
  <div className="example">
    Example
  </div>
);

describe('CustomStep', () => {
  describe('Without wait user', () => {
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
      delay: 0,
      style: { border: 0 },
      previousStep: step,
      triggerNextStep: () => {},
    };

    const wrapper = mount(<CustomStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render', () => {
      expect(wrapper.find(CustomStepContainer)).to.have.length(1);
    });

    it('should render without boder', () => {
      expect(wrapper.find(CustomStepContainer).props().style.border).to.be.equal(0);
    });

    it('should render with Example component', () => {
      expect(wrapper.find(Example)).to.have.length(1);
    });
  });

  describe('With wait user', () => {
    const steps = {
      step1: {
        id: '1',
        component: <Example />,
        waitAction: true,
      },
    };
    const step = steps.step1;
    const settings = {
      step,
      steps,
      delay: 0,
      previousStep: step,
      style: {},
      triggerNextStep: () => {},
    };

    const wrapper = mount(<CustomStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render', () => {
      expect(wrapper.find(CustomStepContainer)).to.have.length(1);
    });

    it('should render with Example component', () => {
      expect(wrapper.find(Example)).to.have.length(1);
    });
  });
});
