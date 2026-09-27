import { stringify, parse } from 'flatted';
import type { ChatStep, ChatSteps } from './types';

export interface ConversationData {
  currentStep: ChatStep;
  previousStep: Partial<ChatStep>;
  previousSteps: ChatStep[];
  renderedSteps: ChatStep[];
}

interface GetDataParams {
  cacheName: string;
  cache: boolean;
  firstStep: ChatStep;
  steps: ChatSteps;
}

const getStorage = (): Storage | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    // accessing localStorage throws when it is blocked (e.g. Safari private mode)
    return null;
  }
};

/**
 * Restore the conversation from the cache, or start it from the first step.
 * The callback is called when the conversation waits the user input.
 */
const getData = (params: GetDataParams, callback: () => void): ConversationData => {
  const { cacheName, cache, firstStep, steps } = params;
  const currentStep = firstStep;
  // a first user step waits for the user input instead of being rendered right away
  const renderedSteps = firstStep.user ? [] : [firstStep];
  const previousSteps = firstStep.user ? [] : [firstStep];
  const previousStep = {};
  const storage = cache ? getStorage() : null;
  let unParsedCache: string | null = null;

  if (storage) {
    try {
      unParsedCache = storage.getItem(cacheName);
    } catch {
      unParsedCache = null;
    }
  }

  if (storage && unParsedCache) {
    try {
      const data = parse(unParsedCache) as ConversationData;
      const lastStep = data.renderedSteps[data.renderedSteps.length - 1];

      if (lastStep && lastStep.end) {
        storage.removeItem(cacheName);
      } else {
        for (let i = 0, len = data.renderedSteps.length; i < len; i += 1) {
          const renderedStep = data.renderedSteps[i];
          // remove delay of cached rendered steps
          renderedStep.delay = 0;
          // flag used to avoid call triggerNextStep in cached rendered steps
          renderedStep.rendered = true;

          // an error is thrown when render a component from localStorage.
          // So it's necessary reassing the component
          if (renderedStep.component) {
            renderedStep.component = steps[renderedStep.id].component;
          }
        }

        const { trigger, end, options, id } = data.currentStep;

        if (options) {
          delete data.currentStep.rendered;
        }

        // add trigger function to current step
        if (!trigger && !end) {
          const stepOptions = steps[id].options;
          if (options && stepOptions) {
            for (let i = 0; i < options.length; i += 1) {
              options[i].trigger = stepOptions[i].trigger;
              // caches of older versions have no value in options without value
              options[i].value = stepOptions[i].value;
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

const setData = (cacheName: string, cachedData: ConversationData): void => {
  const data = parse(stringify(cachedData)) as Record<string, ChatStep | ChatStep[]>;
  // clean components, they are restored from the steps definition
  for (const key of Object.keys(data)) {
    const value = data[key];
    const list = Array.isArray(value) ? value : [];
    for (let i = 0, len = list.length; i < len; i += 1) {
      if (list[i].component) {
        (list[i] as { component: unknown }).component = list[i].id;
      }
    }
  }

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(cacheName, stringify(data));
    } catch {
      // storage full or blocked, keep the chat working without cache
    }
  }
};

export { getData, setData };
