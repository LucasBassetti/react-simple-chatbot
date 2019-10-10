/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { isNestedVariable, splitByFirstPeriod, insertIntoObjectByPath, isVariable } from '../../lib/utils';

describe('Utils', () => {
  describe('isVariable', () => {
    it('should work for a braced variable', () => {
      expect(isVariable('{variable}')).to.be.true;
    });

    it('should not work for a misplaced brace', () => {
      expect(isVariable('{varia}ble}')).to.be.false;
    });

    it('should not work for no braces string', () => {
      expect(isVariable('variable')).to.be.false;
    })
  })

  describe('isNestedVariable', () => {
    it('should work for a proper nested variable', () => {
      expect(isNestedVariable('{variable.property1}')).to.be.true;
    });

    it('should not work for a proper non-nexted variable', () => {
      expect(isNestedVariable('{variable}')).to.be.false;
    });

    it('should not work for a non-braced nested variable', () => {
      expect(isNestedVariable('variable.property1')).to.be.false;
    });

    it('should not work for deeply nested variable', () => {
      expect(isNestedVariable('{variable.prop1.prop2}')).to.be.true;
    })
  });

  describe('splitByFirstPeriod', () => {
    it('should work for single-property variable', () => {
      expect(splitByFirstPeriod(''))
    })
  })
});
