import { describe, it } from 'mocha';
import { expect } from 'chai';
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
});
