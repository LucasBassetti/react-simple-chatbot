import { describe, it } from 'mocha';
import { expect } from 'chai';

import { isNestedVariable, splitByFirstPeriod, insertIntoObjectByPath } from '../../lib/utils';

describe('Utils', () => {
  describe('isNestedVariable', () => {
    it('should work for a proper nested variable', () => {
      expect(isNestedVariable('{variable.property1}')).to.be(true);
    });
  });
});
