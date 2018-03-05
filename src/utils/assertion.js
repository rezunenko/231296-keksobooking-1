const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

module.exports = {
  textRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  isImage() {
    return {
      assert(image) {
        return image.size > 0 && image.mimetype.startsWith(`image/`);
      },
      message: `should be an image`
    };
  },
  isTimeFormat() {
    return {
      assert(str) {
        let [hoursValidate, minutesValidate] = str.split(`:`);
        hoursValidate = !isNaN(++hoursValidate) && hoursValidate < 24;
        minutesValidate = !isNaN(++minutesValidate) && minutesValidate < 60;
        return hoursValidate && minutesValidate;
      },
      message: `should be format from HH:mm`
    };
  },
  inRange(from, to) {
    return {
      assert(number) {
        return number >= from && number <= to;
      },
      message: `should be in range ${from}..${to}`
    };
  },
  unique() {
    return {
      assert(options) {
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `should be unique`
    };
  },
  oneOf,
  anyOf(choices) {
    return {
      assert(options) {
        const assertion = oneOf(choices);
        return options.every((it) => assertion.assert(it));
      },
      message: `should be one of [${choices}]`
    };
  }
};
