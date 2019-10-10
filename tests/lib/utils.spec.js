/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { isNestedVariable, splitByFirstPeriod, insertIntoObjectByPath, isVariable, getVariableName } from '../../lib/utils';

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
    });
  });

  describe('getVariableName', () => {
    it('should work for proper variable', () => {
      expect(getVariableName('{variable}')).to.be.equal('variable');
    });

    it('should work for proper nested variable', () => {
      expect(getVariableName('{variable.prop1.prop2}')).to.equal('variable.prop1.prop2');
    });

    it('should work for non-variable', () => {
      expect(getVariableName('variable.prop1.prop2')).to.equal('variable.prop1.prop2');
    });
  });

  describe('splitByFirstPeriod', () => {
    it('should work for single-property variable', () => {
      expect(splitByFirstPeriod('variable.property')).to.deep.equal(['variable', 'property']);
    });

    it('should work for braced single-property variable', () => {
      expect(splitByFirstPeriod('{variable.property}')).to.deep.equal(['variable', 'property']);
    });

    it('should work for multi-property variable', () => {
      expect(splitByFirstPeriod('variable.prop1.prop2.prop3')).to.deep.equal([
        'variable',
        'prop1.prop2.prop3'
      ]);
    });

    it('should work for no-property variable', () => {
      expect(splitByFirstPeriod('variable')).to.deep.equal(['variable', null]);
    });
  });
});
