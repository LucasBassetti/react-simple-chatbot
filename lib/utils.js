import axios from 'axios';

export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = value => typeof value === 'string';

export const isVariable = variable => {
  return variable.indexOf('{') === 0 && variable.indexOf('}') === variable.length - 1;
};

export const isNestedVariable = variable => {
  return isVariable(variable) && variable.indexOf('.') !== -1;
};

export const extractVariableName = variable => {
  return isVariable(variable) ? variable.substring(1, variable.length - 1) : variable;
};

export const makeVariable = variableName => {
  return isVariable(variableName) ? variableName : `{${variableName}}`;
};

export const splitByFirstPeriod = variableName => {
  variableName = isVariable(variableName) ? extractVariableName(variableName) : variableName;

  const indexOfFirstPeriod = variableName.indexOf('.');
  if (indexOfFirstPeriod === -1) {
    return [variableName, null];
  }

  return [
    variableName.substring(0, indexOfFirstPeriod),
    variableName.substring(indexOfFirstPeriod + 1)
  ];
};

export const insertIntoObjectByPath = (object, path, value) => {
  const [firstVariable, remainingPath] = splitByFirstPeriod(path);

  if (!remainingPath) {
    object[firstVariable] = value;
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(object, firstVariable)) {
    object[firstVariable] = {};
  }

  if (typeof object[firstVariable] !== 'object' || Array.isArray(object[firstVariable])) {
    // eslint-disable-next-line no-console
    console.error(`Error: The given path ${path} is not insertable`);
    return;
  }

  insertIntoObjectByPath(object[firstVariable], remainingPath, value);
};

export const getFromObjectByPath = (object, path) => {
  if (!object) {
    return null;
  }

  let value;

  const [firstVariable, remainingPath] = splitByFirstPeriod(path);

  if (!remainingPath) {
    value = object[firstVariable];
  } else if (Object.prototype.hasOwnProperty.call(object, firstVariable)) {
    value = getFromObjectByPath(object[firstVariable], remainingPath);
  }

  return value;
};

export const getStepsFromBackend = async (url, stepId, value) => {
  try {
    return (await axios.get(url, {
      params: {
        stepId,
        value
      }
    })).data;
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch next step of chat');
  }
};

export const deepCopy = object => JSON.parse(JSON.stringify(object));

export const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));
