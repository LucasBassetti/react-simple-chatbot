import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { stringify } from 'flatted';
import schema from '../../src/schemas/schema';

describe('schema', () => {
  it('should throw a invalid step error', () => {
    const step = { test: 'test' };
    expect(() => schema.parse(step)).toThrow(`The step ${stringify(step)} is invalid`);
  });

  it('should throw a key required error', () => {
    const step = { message: 'test' };
    expect(() => schema.parse(step)).toThrow(`Key 'id' is required in step ${stringify(step)}`);
  });

  it('should throw a key type error', () => {
    const step = { id: () => {}, options: [] };
    expect(() => schema.parse(step)).toThrow(
      "The type of 'id' value must be string or number instead of function"
    );
  });

  it('should delete a invalid key', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const step = schema.parse({ id: '1', message: 'test', test: 'test' });
    expect(step).toEqual({ id: '1', message: 'test' });
    expect(error).toHaveBeenCalledWith("Invalid key 'test' in step '1'");
    error.mockRestore();
  });

  it('should not throw error to a user step', () => {
    expect(() => schema.parse({ id: '1', user: true, end: true })).not.toThrow();
  });

  it('should not throw error to a component step', () => {
    expect(() => schema.parse({ id: '1', component: <div />, end: true })).not.toThrow();
  });

  it('should not throw error to a update step', () => {
    expect(() => schema.parse({ id: '1', update: '2', trigger: '3' })).not.toThrow();
  });

  it('should throw error of inexistent step id', () => {
    const steps = { 1: { id: '1', message: 'Test', trigger: '2' } };
    expect(() => schema.checkInvalidIds(steps)).toThrow(
      "The id '2' triggered by step '1' does not exist"
    );
  });

  it('should throw error of inexistent step id in option', () => {
    const steps = {
      1: { id: '1', options: [{ label: 'test', value: 'test', trigger: '2' }] }
    };
    expect(() => schema.checkInvalidIds(steps)).toThrow(
      "The id '2' triggered by option 1 in step '1' does not exist"
    );
  });

  it('should not throw error of existent step id', () => {
    const steps = {
      1: { id: '1', message: 'Test', trigger: '2' },
      2: { id: '2', message: 'End', end: true }
    };
    expect(() => schema.checkInvalidIds(steps)).not.toThrow();
  });

  it('should not check function triggers', () => {
    const steps = { 1: { id: '1', message: 'Test', trigger: () => 'missing' } };
    expect(() => schema.checkInvalidIds(steps)).not.toThrow();
  });

  it('should not throw error with metadata', () => {
    const step = { id: '1', message: 'Test', metadata: { data: 'test' } };
    expect(schema.parse(step)).toBe(step);
  });

  it('should not throw error with inputAttributes', () => {
    const step = { id: '1', message: 'Test', inputAttributes: { autoComplete: 'firstname' } };
    expect(schema.parse(step)).toBe(step);
  });
});
