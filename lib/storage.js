const JSON = require('circular-json');

/* istanbul ignore next */
const getData = ({ cacheName, cache, firstStep, steps }, callback) => {
  const currentStep = firstStep;
  const renderedSteps = [steps[currentStep.id]];
  const previousSteps = [steps[currentStep.id]];
  const previousStep = {};

  if (cache && localStorage.getItem(cacheName)) {
    const data = JSON.parse(localStorage.getItem(cacheName));
    const lastStep = data.renderedSteps[data.renderedSteps.length - 1];

    if (lastStep && lastStep.end) {
      localStorage.removeItem('rsc_cache');
    } else {
      for (let i = 0; i < data.renderedSteps.length; i += 1) {
        // remove delay of cached rendered steps
        data.renderedSteps[i].delay = 0;
        // flag used to avoid call triggerNextStep in cached rendered steps
        data.renderedSteps[i].rendered = true;

        // an error is thrown when render a component from localStorage.
        // So it's necessary reassing the component
        if (data.renderedSteps[i].component) {
          const id = data.renderedSteps[i].id;
          data.renderedSteps[i].component = steps[id].component;
        }
      }

      // execute callback function to enable input if last step is
      // waiting user type
      if (data.currentStep.user) {
        callback();
      }

      return data;
    }
  }

  return {
    currentStep,
    previousStep,
    previousSteps,
    renderedSteps,
  };
};

/* istanbul ignore next */
const setData = (cacheName, data) => {
  localStorage.setItem(cacheName, JSON.stringify(data));
};

export {
  getData,
  setData,
};
