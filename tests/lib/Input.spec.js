import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Input from '../../lib/components/Input';

describe('Input', () => {
  it('should render a disabled input', () => {
    const wrapper = mount(<Input disabled={true} />);
    expect(wrapper.props().disabled).to.be.equal(true);
  });

  it('should render a invalid input', () => {
    const wrapper = mount(<Input invalid={true} />);
    expect(wrapper.props().invalid).to.be.equal(true);
  });
});
