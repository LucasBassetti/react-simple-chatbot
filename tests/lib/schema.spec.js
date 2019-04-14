import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import schema from '../../lib/schemas/schema';
import { stringify } from 'flatted';

describe('schema', () => {
  it('should throw a invalid step error', () => {
    const step = { test: 'test' };
    expect(() => {
      schema.parse(step);
    }).to.throw(Error, `The step ${stringify(step)} is invalid`);
  });

  it('should throw a key required error', () => {
    const step = { message: 'test' };
    expect(() => {
      schema.parse(step);
    }).to.throw(Error, `Key 'id' is required in step ${stringify(step)}`);
  });

  it('should throw a key type error', () => {
    const step = { id: () => { }, options: [] };
    expect(() => {
      schema.parse(step);
    }).to.throw(Error, 'The type of \'id\' value must be string or number instead of function');
  });

  it('should delete a invalid key', () => {
    const step = schema.parse({
      id: '1',
      message: 'test',
      test: 'test',
    });
    const resultStep = stringify({ id: '1', message: 'test' });
    expect(stringify(step)).to.be.equal(resultStep);
  });

  it('should not throw error to a user step', () => {
    const step = { id: '1', user: true, end: true };
    expect(() => {
      schema.parse(step);
    }).to.not.throw();
  });

  it('should not throw error to a component step', () => {
    const step = { id: '1', component: <div />, end: true };
    expect(() => {
      schema.parse(step);
    }).to.not.throw();
  });

  it('should not throw error to a update step', () => {
    const step = { id: '1', update: '2', trigger: '3' };
    expect(() => {
      schema.parse(step);
    }).to.not.throw();
  });

  it('should throw error of inexistent step id', () => {
    const steps = {
      1: {
        id: '1',
        message: 'Test',
        trigger: '2',
      },
    };
    expect(() => {
      schema.checkInvalidIds(steps);
    }).to.throw();
  });

  it('should throw error of inexistent step id in option', () => {
    const steps = {
      1: {
        id: '1',
        options: [
          { label: 'test', value: 'test', trigger: '2' },
        ],
      },
    };
    expect(() => {
      schema.checkInvalidIds(steps);
    }).to.throw();
  });

  it('should not throw error of inexistent step id', () => {
    const steps = {
      1: {
        id: '1',
        message: 'Test',
        trigger: '2',
      },
      2: {
        id: '2',
        message: 'End',
        end: true,
      },
    };
    expect(() => {
      schema.checkInvalidIds(steps);
    }).to.not.throw();
  });
  it('should not throw error with metadata', () => {
    const step = { id: '1', message: 'Test', metadata: { data: 'test' } };
    expect(() => {
      schema.parse(step);
    }).to.not.throw();
    const resultStep = schema.parse(step);
    expect(resultStep).to.be.equal(step);
  });
  it('should not throw error with inputAttributes', () => {
    const step = { id: '1', message: 'Test', inputAttributes: { autoComplete: 'firstname' } };
    expect(() => {
      schema.parse(step);
    }).to.not.throw();
    const resultStep = schema.parse(step);
    expect(resultStep).to.be.equal(step);
  });
});
