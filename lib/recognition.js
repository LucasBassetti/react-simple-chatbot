let instance = null;

const noop = () => {};

export default class Recognition {
  static isSupported() {
    return 'webkitSpeechRecognition' in window;
  }

  /**
   * Creates an instance of Recognition.
   * @param {function} [onChange] callback on change
   * @param {function} [onEnd]  callback on and
   * @param {function} [onStop]  callback on stop
   * @param {string} [lang='en'] recognition lang
   * @memberof Recognition
   * @constructor
   */
  constructor(onChange = noop, onEnd = noop, onStop = noop, lang = 'en') {
    if (!instance) {
      instance = this;
    }
    this.state = {
      inputValue: '',
      lang,
      onChange,
      onEnd,
      onStop
    };

    this.onResult = this.onResult.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.setup();

    return instance;
  }

  /**
   * Handler for recognition change event
   * @param {string} interimTranscript
   * @memberof Recognition
   * @private
   */
  onChange(interimTranscript) {
    const { onChange } = this.state;
    this.setState({
      inputValue: interimTranscript
    });
    onChange(interimTranscript);
  }

  /**
   * Handler for recognition change event when its final
   * @param {string} finalTranscript
   * @memberof Recognition
   * @private
   */
  onFinal(finalTranscript) {
    this.setState({
      inputValue: finalTranscript
    });
    this.recognition.stop();
  }

  /**
   * Handler for recognition end event
   * @memberof Recognition
   * @private
   */
  onEnd() {
    const { onStop, onEnd, force } = this.state;
    this.setState({ speaking: false });
    if (force) {
      onStop();
    } else {
      onEnd();
    }
  }

  /**
   * Handler for recognition result event
   * @memberof Recognition
   * @private
   */
  onResult(event) {
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
  }

  /**
   * method for updating the instance state
   * @param {object} nextState
   * @memberof Recognition
   * @private
   */
  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
  }

  /**
   * setup the browser recognition
   * @returns {Recognition}
   * @memberof Recognition
   * @public
   */
  setup() {
    if (!Recognition.isSupported()) {
      return this;
    }

    const { webkitSpeechRecognition } = window;

    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.state.lang;
    this.recognition.onresult = this.onResult;
    this.recognition.onend = this.onEnd;
    return this;
  }

  /**
   * change the recognition lang and resetup
   * @param {string} lang the new lang
   * @returns {Recognition}
   * @memberof Recognition
   * @public
   */
  setLang(lang) {
    this.setState({ lang });
    this.setup();
    return this;
  }

  /**
   * toggle the recognition
   * @returns {Recognition}
   * @memberof Recognition
   * @public
   */
  speak() {
    if (!Recognition.isSupported()) {
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
