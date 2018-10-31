import {
  describe,
  it,
  afterEach,
  beforeEach,
} from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';

import { getSpeakText, speakFn } from '../../lib/speechSynthesis';

describe('SpeechSynthesis', () => {
  describe('getSpeakTest', () => {
    it('should get speak from metadata', () => {
      const text = getSpeakText({ metadata: { speak: 'test' } });
      expect(text).to.eql('test');
    });

    it('should get speak from metadata before message', () => {
      const text = getSpeakText({ message: 'message', metadata: { speak: 'test' } });
      expect(text).to.eql('test');
    });

    it('should get speak from message if metadata.speak is empty', () => {
      const text = getSpeakText({ message: 'message', metadata: { speak: null } });
      expect(text).to.eql('message');
    });

    it('should get speak from message', () => {
      const text = getSpeakText({ message: 'message' });
      expect(text).to.eql('message');
    });

    it('should fallback to empty string', () => {
      const text = getSpeakText({});
      expect(text).to.eql('');
    });
  });

  describe('speak', () => {
    const speakSpy = spy();

    beforeEach(() => {
      global.window.speechSynthesis = {
        speak: speakSpy,
      };
      global.window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance() {};
    });

    afterEach(() => {
      speakSpy.resetHistory();
    });

    it('should not speak if disabled', () => {
      const speak = speakFn({ enable: false });
      speak({});
      expect(speakSpy.called).to.eql(false);
    });

    it('should not speak if SpeechSynthesisUtterance is not supported', () => {
      global.window.SpeechSynthesisUtterance = undefined;
      const speak = speakFn({ enable: true });
      speak({});
      expect(speakSpy.called).to.eql(false);
    });

    it('should not speak if speechSynthesis is not supported', () => {
      global.window.speechSynthesis = undefined;
      const speak = speakFn({ enable: true });
      speak({});
      expect(speakSpy.called).to.eql(false);
    });

    it("should not speak if it's user msg", () => {
      const speak = speakFn({ enable: true });
      speak({ user: true });
      expect(speakSpy.called).to.eql(false);
    });

    it('should speak empty string (nothing)', () => {
      const speak = speakFn({ enable: true });
      speak({});
      expect(speakSpy.getCall(0).args[0]).to.eql({ text: '', lang: undefined, voice: undefined });
    });
  });
});
