const db = require(`../../database/database`);
const mongodb = require(`mongodb`);

class ImageStore {
  constructor(name) {
    this.name = name;
  }

  async getBucket() {
    if (this._bucket) {
      return this._bucket;
    }

    const dBase = await db;
    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 1024 * 1024,
        bucketName: this.name
      });
    }

    return this._bucket;
  }

  async get(filename) {
    const bucket = await this.getBucket();
    const results = await (bucket).find({filename}).toArray();
    const entity = results[0];
    if (!entity) {
      return void 0;
    }

    return {info: entity, stream: bucket.openDownloadStreamByName(filename)};
  }

  async save(filename, stream) {
    const bucket = await this.getBucket();

    return new Promise((res, rej) => {
      stream.pipe(bucket.openUploadStream(filename).on(`error`, rej).on(`finish`, res));
    });
  }
}

module.exports = (name) => new ImageStore(name);
