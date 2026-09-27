type Callback = () => void;
type ChangeCallback = (value: string) => void;

interface RecognitionState {
  inputValue: string;
  lang: string;
  onChange: ChangeCallback;
  onEnd: Callback;
  onStop: Callback;
  speaking?: boolean;
  force?: boolean;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const noop = () => {};

export default class Recognition {
  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'webkitSpeechRecognition' in window;
  }

  state: RecognitionState;

  recognition?: SpeechRecognitionLike;

  /**
   * Creates an instance of Recognition.
   * @param onChange callback on change
   * @param onEnd callback on end
   * @param onStop callback on stop
   * @param lang recognition lang
   */
  constructor(
    onChange: ChangeCallback = noop,
    onEnd: Callback = noop,
    onStop: Callback = noop,
    lang = 'en'
  ) {
    this.state = {
      inputValue: '',
      lang,
      onChange,
      onEnd,
      onStop
    };

    this.setup();
  }

  /**
   * Handler for recognition change event
   */
  private onChange(interimTranscript: string) {
    const { onChange } = this.state;
    this.setState({
      inputValue: interimTranscript
    });
    onChange(interimTranscript);
  }

  /**
   * Handler for recognition change event when its final
   */
  private onFinal(finalTranscript: string) {
    const { onChange } = this.state;
    this.setState({
      inputValue: finalTranscript
    });
    // the chatbot submits its input value when the recognition ends
    onChange(finalTranscript);
    this.recognition?.stop();
  }

  /**
   * Handler for recognition end event
   */
  private onEnd = () => {
    const { onStop, onEnd, force } = this.state;
    // force only applies to the recognition the user stopped
    this.setState({ speaking: false, force: false });
    if (force) {
      onStop();
    } else {
      onEnd();
    }
  };

  /**
   * Handler for recognition result event
   */
  private onResult = (event: SpeechRecognitionEventLike) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
        this.onFinal(finalTranscript);
      } else {
        interimTranscript += event.results[i][0].transcript;
        this.onChange(interimTranscript);
      }
    }
  };

  /**
   * Update the instance state
   */
  private setState(nextState: Partial<RecognitionState>) {
    this.state = { ...this.state, ...nextState };
  }

  /**
   * Setup the browser recognition
   */
  setup(): this {
    if (!Recognition.isSupported()) {
      return this;
    }

    const SpeechRecognition = window.webkitSpeechRecognition as SpeechRecognitionConstructor;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.state.lang;
    this.recognition.onresult = this.onResult;
    this.recognition.onend = this.onEnd;
    return this;
  }

  /**
   * Change the recognition lang and setup again
   */
  setLang(lang: string): this {
    this.setState({ lang });
    this.setup();
    return this;
  }

  /**
   * Toggle the recognition
   */
  speak(): this {
    if (!Recognition.isSupported() || !this.recognition) {
      return this;
    }
    const { speaking } = this.state;
    if (!speaking) {
      this.recognition.start();
      this.setState({
        speaking: true,
        inputValue: ''
      });
    } else {
      this.setState({
        force: true
      });
      this.recognition.stop();
    }
    return this;
  }
}
