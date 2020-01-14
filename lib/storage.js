import { stringify, parse } from 'flatted/cjs';

/* istanbul ignore next */
const getData = async (params, callback) => {
  const { cacheName, cache, firstStep, steps, getStepFromApi } = params;
  const currentStep = firstStep;
  const renderedSteps = [steps[currentStep.id]];
  const previousSteps = [steps[currentStep.id]];
  const previousStep = {};
  const unParsedCache = localStorage.getItem(cacheName);

  if (cache && unParsedCache) {
    try {
      const data = parse(unParsedCache);

      for (let i = 0, len = data.renderedSteps.length; i < len; i += 1) {
        const renderedStep = data.renderedSteps[i];
        // remove delay of cached rendered steps
        data.renderedSteps[i].delay = 0;
        // flag used to avoid call triggerNextStep in cached rendered steps
        data.renderedSteps[i].rendered = true;

        const { user, value } = data.currentStep;
        const waitingForUserInput = user && !value;

        // If currentStep is TextStep, it wont be able to trigger itself. Thus, last renderStep should trigger it
        if (i === len - 1 && !waitingForUserInput) delete data.renderedSteps[i].rendered;

        // an error is thrown when render a component from localStorage.
        // So it's necessary reassing the component
        if (renderedStep.component) {
          const { id } = renderedStep;
          data.renderedSteps[i].component = steps[id].component;
        }
      }

      const { trigger, end, options, user, value } = data.currentStep;
      let { id } = data.currentStep;
      const { updatedBy } = data.currentStep;

      // if it's an update step, we should take the trigger function from the update step
      if (updatedBy) {
        id = updatedBy;
      }

      if (!steps[id]) {
        steps[id] = await getStepFromApi(id);
      }

      const waitingForUserInput = user && !value;

      if (!waitingForUserInput) {
        delete data.currentStep.rendered;
      }

      // add trigger function to current step
      if ((!trigger && !end) || updatedBy) {
        if (options) {
          for (let i = 0; i < options.length; i += 1) {
            if (updatedBy && steps[id].updateOptions) {
              data.currentStep.options[i].trigger = steps[id].updateOptions[i].trigger;
            } else if (updatedBy && !steps[id].updateOptions) {
              data.currentStep.options[i].trigger = steps[id].trigger;
            } else {
              data.currentStep.options[i].trigger = steps[id].options[i].trigger;
            }
          }
        } else if (!trigger && !end) {
          data.currentStep.trigger = steps[id].trigger;
        }
      }

      // execute callback function to enable input if last step is
      // waiting user type
      if (waitingForUserInput) {
        // get original user step
        if (!steps[data.currentStep.id] && getStepFromApi) {
          try {
            steps[data.currentStep.id] = await getStepFromApi(data.currentStep.id);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Could not get step with id: ${data.currentStep.id}`, error);
          }
        }

        // assign original user step's validator and parser
        if (steps[data.currentStep.id] && steps[data.currentStep.id].validator)
          data.currentStep.validator = steps[data.currentStep.id].validator;

        if (steps[data.currentStep.id] && steps[data.currentStep.id].parser)
          data.currentStep.parser = steps[data.currentStep.id].parser;

        // assign validators and parsers from update step
        if (steps[id].validator) data.currentStep.validator = steps[id].validator;

        if (steps[id].parser) data.currentStep.parser = steps[id].parser;

        callback();
      }

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.info(
        `Unable to parse cache named:${cacheName}. \nThe cache was probably created with an older version of react-simple-chatbot.\n`,
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

  const stringifiedData = stringify(data);
  localStorage.setItem(cacheName, stringifiedData);
  return stringifiedData;
};

export { getData, setData };
