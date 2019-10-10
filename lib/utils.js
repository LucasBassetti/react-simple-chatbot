export const isMobile = () => /iphone|ipod|android|ie|blackberry|fennec/i.test(navigator.userAgent);

export const isString = value => typeof value === 'string';

export const isNestedVariable = variable => {
  return (
    variable.indexOf('{') === 0 &&
    variable.indexOf('}') === variable.length - 1 &&
    variable.indexOf('.') !== -1
  );
};

export const splitByFirstPeriod = variableName => {
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
