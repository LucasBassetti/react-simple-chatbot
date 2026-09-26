import { stringify, parse } from 'flatted';

const getStorage = () => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch (error) {
    // accessing localStorage throws when it is blocked (e.g. Safari private mode)
    return null;
  }
};

/* istanbul ignore next */
const getData = (params, callback) => {
  const { cacheName, cache, firstStep, steps } = params;
  const currentStep = firstStep;
  // a first user step waits for the user input instead of being rendered right away
  const renderedSteps = firstStep.user ? [] : [steps[currentStep.id]];
  const previousSteps = firstStep.user ? [] : [steps[currentStep.id]];
  const previousStep = {};
  const storage = cache ? getStorage() : null;
  let unParsedCache = null;

  if (storage) {
    try {
      unParsedCache = storage.getItem(cacheName);
    } catch (error) {
      unParsedCache = null;
    }
  }

  if (unParsedCache) {
    try {
      const data = parse(unParsedCache);
      const lastStep = data.renderedSteps[data.renderedSteps.length - 1];

      if (lastStep && lastStep.end) {
        storage.removeItem(cacheName);
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
      // eslint-disable-next-line no-console
      console.info(
        `Unable to parse cache named:${cacheName}. \nThe cache where probably created with an older version of react-simple-chatbot.\n`,
        error
      );
    }
  }

  if (firstStep.user) {
    callback();
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

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(cacheName, stringify(data));
    } catch (error) {
      // storage full or blocked, keep the chat working without cache
    }
  }
};

export { getData, setData };
