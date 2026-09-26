import { describe, it } from 'mocha';
import { expect } from 'chai';
import rgba from '../../lib/common/rgba';

describe('rgba', () => {
  it('should transform black to rgba', () => {
    const color = rgba('#fff');
    expect(color).to.be.equal('rgba(255, 255, 255, 1)');
  });
  it('should transform red to rgba', () => {
    const color = rgba('#ff0000', 0.5);
    expect(color).to.be.equal('rgba(255, 0, 0, 0.5)');
  });
  it('should put alpha default', () => {
    const color = rgba('#fff', 1);
    expect(color).to.be.equal('rgba(255, 255, 255, 1)');
  });
  it('should not throw with non hex colors', () => {
    expect(rgba('rebeccapurple', 0.4)).to.be.equal(
      'color-mix(in srgb, rebeccapurple 40%, transparent)'
    );
    expect(rgba('rgb(0, 0, 0)', 0)).to.be.equal('color-mix(in srgb, rgb(0, 0, 0) 0%, transparent)');
  });
});
