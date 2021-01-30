import { stringify, parse } from 'flatted/cjs';

// eslint-disable-next-line no-use-before-define
const DOMException = DOMException || TypeError;

export function isStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function safelyRetrieveLocalStorageItem(storageKey) {
  if (!isStorageAvailable()) {
    return;
  }
  try {
    localStorage.getItem(storageKey);
  } catch (e) {
    // continue regardless of error
  }
}

function safelySetLocalStorageItem(storageKey, value) {
  if (!isStorageAvailable()) {
    return;
  }
  try {
    localStorage.setItem(storageKey, value);
  } catch (e) {
    // continue regardless of error
  }
}

function safelyRemoveLocalStorageItem(storageKey) {
  if (!isStorageAvailable()) {
    return;
  }
  try {
    localStorage.removeItem(storageKey);
  } catch (e) {
    // continue regardless of error
  }
}

/* istanbul ignore next */
const getData = (params, callback) => {
  const { cacheName, cache, firstStep, steps } = params;
  const currentStep = firstStep;
  const renderedSteps = [steps[currentStep.id]];
  const previousSteps = [steps[currentStep.id]];
  const previousStep = {};
  const unParsedCache = safelyRetrieveLocalStorageItem(cacheName);

  if (cache && unParsedCache) {
    try {
      const data = parse(unParsedCache);
      const lastStep = data.renderedSteps[data.renderedSteps.length - 1];

      if (lastStep && lastStep.end) {
        safelyRemoveLocalStorageItem(cacheName);
      } else {
        for (let i = 0, len = data.renderedSteps.length; i < len; i += 1) {
          const renderedStep = data.renderedSteps[i];
          // remove delay of cached rendered steps
          data.renderedSteps[i].delay = 0;
          // flag used to avoid call triggerNextStep in cached rendered steps
          data.renderedSteps[i].rendered = true;

          // an error is thrown when render a component from localStorage.
          // So it's necessary reassing the component
          if (renderedStep.component) {
            const { id } = renderedStep;
            data.renderedSteps[i].component = steps[id].component;
          }
        }

        const { trigger, end, options } = data.currentStep;
        const { id } = data.currentStep;

        if (options) {
          delete data.currentStep.rendered;
        }

        // add trigger function to current step
        if (!trigger && !end) {
          if (options) {
            for (let i = 0; i < options.length; i += 1) {
              data.currentStep.options[i].trigger = steps[id].options[i].trigger;
            }
          } else {
            data.currentStep.trigger = steps[id].trigger;
          }
        }

        // execute callback function to enable input if last step is
        // waiting user type
        if (data.currentStep.user) {
          callback();
        }

        return data;
      }
    } catch (error) {
      console.info(
        `Unable to parse cache named:${cacheName}. \nThe cache where probably created with an older version of react-simple-chatbot.\n`,
        error
      );
    }
  }

  return {
    currentStep,
    previousStep,
    previousSteps,
    renderedSteps
  };
};

/* istanbul ignore next */
const setData = (cacheName, cachedData) => {
  const data = parse(stringify(cachedData));
  // clean components
  for (const key in data) {
    for (let i = 0, len = data[key].length; i < len; i += 1) {
      if (data[key][i].component) {
        data[key][i].component = data[key][i].id;
      }
    }
  }

  safelySetLocalStorageItem(cacheName, stringify(data));
};

export { getData, setData };
