/* eslint-disable */
//! Corti - Replaces the browser's SpeechRecognition with a fake object.
//! version : 0.2.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/SpeechKITT/test/corti.js

// Holds the browser's implementation
const _productionVersion = false;

// Patch DOMException
var DOMException = DOMException || TypeError;

// Speech Recognition attributes
let _maxAlternatives = 1;
let _lang = '';
let _continuous = false;
let _interimResults = false;

const newSpeechRecognition = function () {
  const _self = this;
  const _listeners = document.createElement('div');
  _self._started = false;
  _self.eventListenerTypes = ['start', 'end', 'result'];
  _self.maxAlternatives = 1;

  // Add listeners for events registered through attributes (e.g. recognition.onend = function) and not as proper listeners
  _self.eventListenerTypes.forEach((eventName) => {
    _listeners.addEventListener(
      eventName,
      function () {
        if (typeof _self[`on${eventName}`] === 'function') {
          _self[`on${eventName}`].apply(_listeners, arguments);
        }
      },
      false,
    );
  });

  Object.defineProperty(this, 'maxAlternatives', {
    get() {
      return _maxAlternatives;
    },
    set(val) {
      if (typeof val === 'number') {
        _maxAlternatives = Math.floor(val);
      } else {
        _maxAlternatives = 0;
      }
    },
  });

  Object.defineProperty(this, 'lang', {
    get() {
      return _lang;
    },
    set(val) {
      if (val === undefined) {
        val = 'undefined';
      }
      _lang = val.toString();
    },
  });

  Object.defineProperty(this, 'continuous', {
    get() {
      return _continuous;
    },
    set(val) {
      _continuous = Boolean(val);
    },
  });

  Object.defineProperty(this, 'interimResults', {
    get() {
      return _interimResults;
    },
    set(val) {
      _interimResults = Boolean(val);
    },
  });

  this.start = function () {
    if (_self._started) {
      throw new DOMException(
        "Failed to execute 'start' on 'SpeechRecognition': recognition has already started.",
      );
    }
    _self._started = true;
    // Create and dispatch an event
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('start', false, false, null);
    _listeners.dispatchEvent(event);
  };

  this.abort = function () {
    if (!_self._started) {
      return;
    }
    _self._started = false;
    // Create and dispatch an event
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('end', false, false, null);
    _listeners.dispatchEvent(event);
  };

  this.stop = function () {
    return _self.abort();
  };

  this.isStarted = function () {
    return _self._started;
  };

  this.say = function (sentence) {
    // Create some speech alternatives
    const results = [];
    let commandIterator;
    let etcIterator;
    const itemFunction = function (index) {
      if (undefined === index) {
        throw new DOMException(
          "Failed to execute 'item' on 'SpeechRecognitionResult': 1 argument required, but only 0 present.",
        );
      }
      index = Number(index);
      if (isNaN(index)) {
        index = 0;
      }
      if (index >= this.length) {
        return null;
      }
      return this[index];
    };
    for (commandIterator = 0; commandIterator < _maxAlternatives; commandIterator++) {
      let etc = '';
      for (etcIterator = 0; etcIterator < commandIterator; etcIterator++) {
        etc += ' and so on';
      }
      results.push(sentence + etc);
    }

    // Create the event
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('result', false, false, { sentence });
    event.resultIndex = 0;
    event.results = {
      item: itemFunction,
      0: {
        item: itemFunction,
        final: true,
      },
    };
    for (commandIterator = 0; commandIterator < _maxAlternatives; commandIterator++) {
      event.results[0][commandIterator] = {
        transcript: results[commandIterator],
        confidence: Math.max(1 - 0.01 * commandIterator, 0.001),
      };
    }
    Object.defineProperty(event.results, 'length', {
      get() {
        return 1;
      },
    });
    Object.defineProperty(event.results[0], 'length', {
      get() {
        return _maxAlternatives;
      },
    });
    event.interpretation = null;
    event.emma = null;
    _listeners.dispatchEvent(event);
  };

  this.addEventListener = function (event, callback) {
    _listeners.addEventListener(event, callback, false);
  };
};

export default newSpeechRecognition;
