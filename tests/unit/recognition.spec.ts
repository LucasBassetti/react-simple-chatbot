import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Recognition from '../../src/recognition';
import newSpeechRecognition from '../helpers/corti';

// the fake recognition of corti
const fake = (recognition: Recognition) => recognition.recognition as any;

describe('Recognition', () => {
  describe('Recognition is not supported', () => {
    it('should not be supported', () => {
      expect(Recognition.isSupported()).toBe(false);
    });

    it('should do nothing when speak is called', () => {
      const recognition = new Recognition();
      expect(recognition.recognition).toBeUndefined();
      expect(recognition.speak()).toBe(recognition);
    });
  });

  describe('Recognition supported', () => {
    beforeEach(() => {
      window.webkitSpeechRecognition = newSpeechRecognition;
    });

    afterEach(() => {
      delete window.webkitSpeechRecognition;
    });

    it('should be supported', () => {
      expect(Recognition.isSupported()).toBe(true);
    });

    it('should call onChange', () => {
      const onChange = vi.fn();
      const recognition = new Recognition(onChange);
      recognition.speak();
      fake(recognition).say('hi, this is a test');
      expect(onChange).toHaveBeenCalledWith('hi, this is a test');
    });

    it('should not call end after 0s', () => {
      const onEnd = vi.fn();
      const recognition = new Recognition(vi.fn(), onEnd);
      recognition.speak();
      fake(recognition).say('hi, this is a test');
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('should call onEnd when the browser ends recognition', () => {
      const onEnd = vi.fn();
      const recognition = new Recognition(vi.fn(), onEnd);
      recognition.speak();
      fake(recognition).say('hi, this is a test');
      fake(recognition).abort();
      expect(onEnd).toHaveBeenCalled();
    });

    it('should call onStop when the user stops the recognition', () => {
      const onEnd = vi.fn();
      const onStop = vi.fn();
      const recognition = new Recognition(vi.fn(), onEnd, onStop);
      recognition.speak();
      recognition.speak();
      expect(onStop).toHaveBeenCalled();
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('should use the callbacks of each instance', () => {
      const firstOnChange = vi.fn();
      const secondOnChange = vi.fn();
      new Recognition(firstOnChange);
      const second = new Recognition(secondOnChange);
      second.speak();
      fake(second).say('hi');
      expect(firstOnChange).not.toHaveBeenCalled();
      expect(secondOnChange).toHaveBeenCalled();
    });

    it('should change the lang', () => {
      const recognition = new Recognition().setLang('pt');
      expect(fake(recognition).lang).toBe('pt');
    });
  });
});
