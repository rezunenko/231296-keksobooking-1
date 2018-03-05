const DEFAULT_CONVERTER = (value) => value;

const isCorrectIntValue = (value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {

  return value && isFinite(+value) && value >= min && value <= max;
};

const printError = (name, value, message) => ({
  fieldName: name,
  fieldValue: value,
  errorMessage: message
});

const checkValue = (value) => {
  switch (typeof value) {
    case `string`:
      return value.length > 0;
    case `number`:
      return isCorrectIntValue(value);
    default:
      return value;
  }
};

const validate = (data, fieldName, {required = false, converter = DEFAULT_CONVERTER, assertions}) => {
  const errors = [];
  const field = data[fieldName];
  if (!field && !required) {
    return errors;
  }

  try {
    if (checkValue(field)) {
      const value = converter(field);
      for (const assertion of assertions) {
        if (!(assertion.assert(value, data))) {
          errors.push(printError(fieldName, value, assertion.message));
        }
      }
    } else if (required) {
      errors.push(printError(fieldName, field, `is required`));
    }
  } catch (e) {
    errors.push(printError(fieldName, field, e.message));
  }

  return errors;
};

const validateSchema = (data, schema) => {
  const errors = [];
  for (const key of Object.keys(schema)) {
    for (const error of validate(data, key, schema[key])) {
      errors.push(error);
    }
  }
  return errors;
};

module.exports = {
  isCorrectIntValue,
  validateSchema,
  validate,
  checkValue
};
