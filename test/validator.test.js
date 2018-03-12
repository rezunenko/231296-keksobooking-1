const {validate} = require(`../src/utils/validator`);
const {postSchema: schema} = require(`../src/server/offer/validation`);
const {
  HOUSING_TYPES,
  ROOMS_RANGE,
  HOUSING_PRICE_RANGE,
  ADDRESS_LENGTH_LIMIT,
  FEATURES,
  NAMES_LENGTH_LIMIT
} = require(`../src/generator/generator-constants`);
const assert = require(`assert`);

const assertField = (fieldName, fieldValue, ...errorMessages) => {

  const expected = errorMessages.map((errorMessage) => ({
    fieldName, fieldValue, errorMessage
  }));

  const actual = validate({[fieldName]: fieldValue}, fieldName, schema[fieldName]);

  assert.deepEqual(actual, expected);
};

describe(`validate offers`, () => {
  describe(`TITLE validation`, () => {
    const fieldName = `title`;
    it(`should be require field`, () => {
      assertField(fieldName, null, `is required`);
    });
    it(`should be in range 20..140`, () => {
      assertField(fieldName, 123, `should be in range 20..140`);
    });
  });

  describe(`USER NAMES field validation`, () => {
    const fieldName = `name`;
    it(`should be in range`, () => {
      assertField(fieldName, `2`, `should be in range ${NAMES_LENGTH_LIMIT.min}..${NAMES_LENGTH_LIMIT.max}`);
    });
  });

  describe(`FEATURES validation`, () => {
    const fieldName = `features`;
    it(`should be in range`, () => {
      assertField(fieldName, [`incorrectFeature`], `should be one of [${FEATURES}]`);
    });
    it(`should be in unique`, () => {
      assertField(fieldName, [`washer`, `elevator`, `dishwasher`, `elevator`], `should be unique`);
    });
  });

  describe(`PRICE validation`, () => {
    const fieldName = `price`;
    it(`should be require`, () => {
      assertField(fieldName, null, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, 888888888, `should be in range ${HOUSING_PRICE_RANGE.min}..${HOUSING_PRICE_RANGE.max}`);
    });
  });

  describe(`AVATAR validation`, () => {
    const fieldName = `avatar`;
    it(`should be an image`, () => {
      assertField(fieldName, `not image`, `should be an image`);
    });
  });

  describe(`ADDRESS validation`, () => {
    const fieldName = `address`;
    it(`should require field`, () => {
      assertField(fieldName, null, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `ул.`, `should be in range ${ADDRESS_LENGTH_LIMIT.min}..${ADDRESS_LENGTH_LIMIT.max}`);
    });
  });

  describe(`TYPE validation`, () => {
    const fieldName = `type`;
    it(`should require field`, () => {
      assertField(fieldName, null, `is required`);
    });
    it(`should be one of the types list`, () => {
      assertField(fieldName, `testFailed`, `should be one of [${HOUSING_TYPES}]`);
    });
  });

  describe(`ROOMS validation`, () => {
    const fieldName = `rooms`;
    it(`should require field`, () => {
      assertField(fieldName, null, `is required`);
    });
    it(`should be in range`, () => {
      assertField(fieldName, `6`, `should be in range ${ROOMS_RANGE.min}..${ROOMS_RANGE.max}`);
    });
  });

  describe(`PREVIEW field validation`, () => {
    const fieldName = `preview`;
    it(`should be an image`, () => {
      assertField(fieldName, `not image`, `should be an image`);
    });
  });
});
