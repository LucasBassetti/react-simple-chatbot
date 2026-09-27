import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { getSpeakText, speakFn } from '../../src/speechSynthesis';

describe('SpeechSynthesis', () => {
  describe('getSpeakText', () => {
    it('should get speak from metadata', () => {
      expect(getSpeakText({ metadata: { speak: 'test' } })).toBe('test');
    });

    it('should get speak from metadata before message', () => {
      expect(getSpeakText({ message: 'message', metadata: { speak: 'test' } })).toBe('test');
    });

    it('should get speak from message if metadata.speak is empty', () => {
      expect(getSpeakText({ message: 'message', metadata: { speak: null } })).toBe('message');
    });

    it('should get speak from message', () => {
      expect(getSpeakText({ message: 'message' })).toBe('message');
    });

    it('should fallback to empty string', () => {
      expect(getSpeakText({})).toBe('');
    });
  });

  describe('speak', () => {
    const speakSpy = vi.fn();

    beforeEach(() => {
      vi.stubGlobal('speechSynthesis', { speak: speakSpy });
      vi.stubGlobal('SpeechSynthesisUtterance', function SpeechSynthesisUtterance() {});
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      speakSpy.mockReset();
    });

    it('should not speak if disabled', () => {
      speakFn({ enable: false })({ id: '1' });
      expect(speakSpy).not.toHaveBeenCalled();
    });

    it('should not speak if SpeechSynthesisUtterance is not supported', () => {
      vi.stubGlobal('SpeechSynthesisUtterance', undefined);
      speakFn({ enable: true })({ id: '1' });
      expect(speakSpy).not.toHaveBeenCalled();
    });

    it('should not speak if speechSynthesis is not supported', () => {
      vi.stubGlobal('speechSynthesis', undefined);
      speakFn({ enable: true })({ id: '1' });
      expect(speakSpy).not.toHaveBeenCalled();
    });

    it("should not speak if it's user msg", () => {
      speakFn({ enable: true })({ id: '1', user: true });
      expect(speakSpy).not.toHaveBeenCalled();
    });

    it('should speak empty string (nothing)', () => {
      speakFn({ enable: true })({ id: '1' });
      expect(speakSpy.mock.calls[0][0]).toEqual({ text: '', lang: undefined, voice: undefined });
    });

    it('should replace the previous value', () => {
      speakFn({ enable: true, lang: 'en' })({ id: '1', message: 'Hi {previousValue}!' }, 'John');
      expect(speakSpy.mock.calls[0][0]).toEqual({ text: 'Hi John!', lang: 'en', voice: undefined });
    });
  });
});
