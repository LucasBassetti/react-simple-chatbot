import userSchema from './userSchema';
import textSchema from './textSchema';
import optionsSchema from './optionsSchema';
import customSchema from './customSchema';

const JSON = require('circular-json');

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
    } else {
      throw new Error(`The step ${JSON.stringify(step)} is invalid`);
    }

    for (let i = 0, len = parser.length; i < len; i += 1) {
      const { key, types, required } = parser[i];

      if (!step[key] && required) {
        throw new Error(`Key '${key}' is required in step ${JSON.stringify(step)}`);
      } else if (step[key]) {
        if (types[0] !== 'any' && types.indexOf(typeof step[key]) < 0) {
          throw new Error(`The type of '${key}' value must be ${types.join(' or ')} instead of ${typeof step[key]}`);
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
};

export default schema;
