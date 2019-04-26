import userSchema from './userSchema';
import textSchema from './textSchema';
import optionsSchema from './optionsSchema';
import customSchema from './customSchema';
import updateSchema from './updateSchema';
import { stringify } from 'flatted/cjs';

const schema = {
  parse(step) {
    let parser = [];

    if (step.user) {
      parser = userSchema;
    } else if (step.message) {
      parser = textSchema;
    } else if (step.options) {
      parser = optionsSchema;
    } else if (step.component) {
      parser = customSchema;
    } else if (step.update) {
      parser = updateSchema;
    } else {
      throw new Error(`The step ${stringify(step)} is invalid`);
    }

    for (let i = 0, len = parser.length; i < len; i += 1) {
      const { key, types, required } = parser[i];

      if (!step[key] && required) {
        throw new Error(`Key '${key}' is required in step ${stringify(step)}`);
      } else if (step[key]) {
        if (types[0] !== 'any' && types.indexOf(typeof step[key]) < 0) {
          throw new Error(
            `The type of '${key}' value must be ${types.join(' or ')} instead of ${typeof step[
              key
            ]}`
          );
        }
      }
    }

    const keys = parser.map(p => p.key);

    for (const key in step) {
      if (keys.indexOf(key) < 0) {
        console.error(`Invalid key '${key}' in step '${step.id}'`);
        delete step[key];
      }
    }

    return step;
  },

  checkInvalidIds(steps) {
    for (const key in steps) {
      const step = steps[key];
      const triggerId = steps[key].trigger;

      if (typeof triggerId !== 'function') {
        if (step.options) {
          const triggers = step.options.filter(option => typeof option.trigger !== 'function');
          const optionsTriggerIds = triggers.map(option => option.trigger);

          for (let i = 0, len = optionsTriggerIds.length; i < len; i += 1) {
            const optionTriggerId = optionsTriggerIds[i];
            if (optionTriggerId && !steps[optionTriggerId]) {
              throw new Error(
                `The id '${optionTriggerId}' triggered by option ${i + 1} in step '${
                  steps[key].id
                }' does not exist`
              );
            }
          }
        } else if (triggerId && !steps[triggerId]) {
          throw new Error(
            `The id '${triggerId}' triggered by step '${steps[key].id}' does not exist`
          );
        }
      }
    }
  }
};

export default schema;
