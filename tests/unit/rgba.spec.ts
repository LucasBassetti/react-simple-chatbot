import { describe, it, expect } from 'vitest';
import rgba from '../../src/common/rgba';

describe('rgba', () => {
  it('should transform black to rgba', () => {
    expect(rgba('#fff')).toBe('rgba(255, 255, 255, 1)');
  });

  it('should transform red to rgba', () => {
    expect(rgba('#ff0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('should put alpha default', () => {
    expect(rgba('#fff', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('should not throw with non hex colors', () => {
    expect(rgba('rebeccapurple', 0.4)).toBe('color-mix(in srgb, rebeccapurple 40%, transparent)');
    expect(rgba('rgb(0, 0, 0)', 0)).toBe('color-mix(in srgb, rgb(0, 0, 0) 0%, transparent)');
  });
});
