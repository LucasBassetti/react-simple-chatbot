import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import Recognition from '../../lib/recognition';
import newSpeechRecognition from '../helpers/corti';

describe('Recognition', () => {
  describe('Recognition is not supported', () => {
    it('should not be supported', () => {
      expect(Recognition.isSupported()).to.be.equal(false);
    });
  });
  describe('Recognition supported', () => {
    beforeEach(() => {
      window.webkitSpeechRecognition = newSpeechRecognition;
    });

    it('should be supported', () => {
      expect(Recognition.isSupported()).to.be.equal(true);
    });

    it('should call onChange', () => {
      const onChange = spy();
      const recognition = new Recognition(onChange);
      recognition.speak();
      recognition.recognition.say('hi, this is a test');
      expect(onChange.called).to.be.equal(true);
      expect(onChange.args[0][0]).to.be.equal('hi, this is a test');
    });

    it('should not call end after 0s', () => {
      const onChange = spy();
      const onEnd = spy();
      const recognition = new Recognition(onChange, onEnd);
      recognition.speak();
      recognition.recognition.say('hi, this is a test');
      expect(onEnd.called).to.be.equal(false);
    });

    it('should call end after 1s', () => {
      const onChange = spy();
      const onEnd = spy();
      const recognition = new Recognition(onChange, onEnd);
      recognition.speak();
      recognition.recognition.say('hi, this is a test');
      setTimeout(() => {
        expect(onEnd.called).to.be.equal(true);
      }, 1000);
    });
  });
});
