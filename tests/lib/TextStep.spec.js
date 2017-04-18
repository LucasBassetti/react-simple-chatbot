import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { TextStep } from '../../lib/steps/steps';

describe('TextStep', () => {
  describe('Bot text', () => {
    const settings = {
      id: '1',
      message: 'Hello',
      delay: 1000,
      bubbleColor: '#eee',
      fontColor: '#000',
      avatar: '',
      isFirst: true,
      isLast: true,
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render', () => {
      expect(wrapper.hasClass('chat-text-step')).to.be.equal(true);
    });

    it('should render bubble with background color equal \'#eee\'', () => {
      expect(wrapper.find('.chat-content').prop('style').background).to.be.equal('#eee');
    });

    it('should render bubble with font color equal \'#000\'', () => {
      expect(wrapper.find('.chat-content').prop('style').color).to.be.equal('#000');
    });

    it('should render image', () => {
      expect(wrapper.find('.image').exists()).to.be.equal(true);
    });

    it('should render bubble with message equal \'Hello\'', () => {
      expect(wrapper.find('.chat-content').text()).to.be.equal('Hello');
    });
  });

  describe('User text', () => {
    const settings = {
      id: '1',
      message: 'Hello',
      delay: 1000,
      user: true,
      bubbleColor: '#eee',
      fontColor: '#000',
      avatar: '',
      isFirst: false,
      isLast: true,
      triggerNextStep: () => {},
    };

    const wrapper = shallow(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble in right (flex order equal 1)', () => {
      expect(wrapper.find('.chat-image').prop('style').order).to.be.equal(1);
    });

    it('should render bubble without image (not first)', () => {
      expect(wrapper.find('.image').exists()).to.be.equal(false);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = shallow(<TextStep {...settings} isFirst={false} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find('.image').exists()).to.be.equal(false);
      expect(tsWrapper.find('.chat-content').prop('style').borderRadius).to.be.equal('18px 0 0 18px');
    });
  });
});
