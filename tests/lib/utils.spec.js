/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha';
import { expect } from 'chai';

import {
  isNestedVariable,
  splitByFirstPeriod,
  isVariable,
  extractVariableName,
  insertIntoObjectByPath
} from '../../lib/utils';

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

  describe('extractVariableName', () => {
    it('should work for proper variable', () => {
      expect(extractVariableName('{variable}')).to.be.equal('variable');
    });

    it('should work for proper nested variable', () => {
      expect(extractVariableName('{variable.prop1.prop2}')).to.equal('variable.prop1.prop2');
    });

    it('should work for non-variable', () => {
      expect(extractVariableName('variable.prop1.prop2')).to.equal('variable.prop1.prop2');
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

  describe('insertIntoObjectByPath', () => {
    const object = {
      property1: {
        property2: 'hello'
      },
      property3: 'hi there'
    };

    it('should work for 1-depth path', () => {
      insertIntoObjectByPath(object, 'property4', 'value');

      expect(object.property4).to.equal('value');
    });

    it('should replace old value', () => {
      insertIntoObjectByPath(object, 'property1.property2', 'new value');

      expect(object.property1.property2).to.equal('new value');
    });

    it('should work for 2-depth path', () => {
      insertIntoObjectByPath(object, 'property1.property5', 'value');

      expect(object.property1.property5).to.equal('value');
    });

    it('should work for multi-depth path with multiple non-existing properties', () => {
      insertIntoObjectByPath(object, 'property1.property6.property7.property8', 'value');

      expect(object.property1.property6.property7.property8).to.equal('value');
    });

    it('should work for multi-depth path with multiple non-existing properties', () => {
      insertIntoObjectByPath(object, 'property1.property6.property7.property8', 'value');

      expect(object.property1.property6.property7.property8).to.equal('value');
    });

    it('should not work when the path can not contain object due to previous value', () => {
      insertIntoObjectByPath(object, 'property1.property2.property9.property10', 'value');

      expect(object.property1.property2.property9).to.be.undefined;
    });
  });
});
