const offersRouter = require(`../src/server/routes/offers`);
const {getElements} = require(`./generator`);

const offers = getElements(5);
console.log(`HEYHEY`, offers);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOffersStore {
  constructor() {
    console.log(`444444444444444444444444444`);
  }

  async getOffer(date) {

    return offers.data.find((item) => item.date === date);
  }

  async getAllOffers() {
    console.log(`2222222222222222222222222222222222222`);
    return new Cursor(offers.data);
  }

  async save() {
  }
}


class MockImageStore {
  async getBucket() {
  }

  async get() {
  }

  async save() {
  }
}

module.exports = offersRouter(new MockOffersStore(), new MockImageStore());
