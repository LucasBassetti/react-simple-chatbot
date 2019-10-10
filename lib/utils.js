export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = value => typeof value === 'string';

export const isVariable = variable => {
  return variable.indexOf('{') === 0 && variable.indexOf('}') === variable.length - 1;
};

export const isNestedVariable = variable => {
  return isVariable(variable) && variable.indexOf('.') !== -1;
};

export const getVariableName = variable => {
  return isVariable(variable) ? variable.substring(1, variable.length - 1) : variable;
};

export const splitByFirstPeriod = variableName => {
  variableName = isVariable(variableName) ? getVariableName(variableName) : variableName;

  const indexOfFirstPeriod = variableName.indexOf('.');
  if (indexOfFirstPeriod === -1) {
    return [variableName, null];
  }

  return [
    variableName.substring(0, indexOfFirstPeriod + 1),
    variableName.substring(indexOfFirstPeriod + 1)
  ];
};

export const insertIntoObjectByPath = (object, path, value) => {
  const [firstVariable, remainingPath] = this.splitByFirstPeriod(path);

  if (!Object.prototype.hasOwnProperty.call(object, firstVariable)) {
    object[firstVariable] = {};
  }

  if (typeof object[firstVariable] !== 'object' || Array.isArray(object[firstVariable])) {
    console.error(`Error: The given path ${path} is not insertable`);
  }

  if (remainingPath) {
    this.insertIntoObjectByPath(object[firstVariable], remainingPath, value);
  } else {
    object[firstVariable] = value;
  }
};
