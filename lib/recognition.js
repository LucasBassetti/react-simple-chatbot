let instance = null;

const noop = () => {};

export default class Recognition {
  static isSupported() {
    return 'webkitSpeechRecognition' in window;
  }

  constructor(onChange = noop, onEnd = noop, lang = 'en') {
    if (!instance) {
      instance = this;
    }
    this.state = {
      inputValue: '',
      lang,
      onChange,
      onEnd,
    };

    this.onResult = this.onResult.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.setup();
    return instance;
  }
  setup() {
    if (!Recognition.isSupported()) {
      return;
    }
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.state.lang;
    this.recognition.onresult = this.onResult;
    this.recognition.onend = this.onEnd;
    this.recognition.onsoundend = this.onEnd;
  }

  onChange(interimTranscript) {
    const { onChange } = this.state;
    this.setState({
      speaking: false,
      inputValue: interimTranscript,
    });
    onChange(interimTranscript);
  }

  onFinal(finalTranscript) {
    const { onChange, onEnd } = this.state;
    this.setState({
      speaking: false,
      inputValue: finalTranscript,
    });

    onChange(finalTranscript);
    onEnd(finalTranscript);
  }
  onEnd() {
    this.setState({ speaking: false });
  }
  onNoSound() {
    const { inputValue } = this.state;
    this.recognition.stop();
    this.setState({ speaking: false });
    this.onFinal(inputValue);
  }
  onResult(event) {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
        this.onFinal(finalTranscript);
      } else {
        interimTranscript += event.results[i][0].transcript;
        this.onChange(interimTranscript);
      }
    }
  }

  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
  }

  setLang(lang) {
    this.setState({ lang });
    this.setup();
  }

  speak() {
    if (!Recognition.isSupported()) {
      return;
    }
    const { speaking } = this.state;
    if (!speaking) {
      this.recognition.start();
      this.setState({
        speaking: true,
        inputValue: '',
      });
    } else {
      this.recognition.stop();
    }
  }
}
