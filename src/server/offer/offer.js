const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const async = require(`../../utils/async`);
const NotFoundError = require(`../errors/not-found-error`);
const InternalServerError = require(`../errors/internal-server-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const createStreamFromBuffer = require(`../../utils/stream-from-buffer`);
const logger = require(`../../winston`);

class Offer {
  constructor(store) {
    this.offersRouter = store;

    this.getAll = async(async (req) => {
      const {skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT} = req.query;

      return await this.offersRouter.store.getAll(+skip, +limit);
    });

    this.get = async(async (req) => {
      const date = +req.params[`date`];
      const offer = await this.offersRouter.store.get(date);

      if (!offer) {
        throw new NotFoundError(`There is no offer for ${date} date`);
      }

      return offer;
    });

    this.getAvatar = async(async (req, res) => {
      const date = +req.params[`date`];
      const offer = await this.offersRouter.store.get(date);

      if (!offer) {
        throw new BadRequestError(`Offer wasn't found`);
      }

      const avatar = offer.author && offer.author.avatar;
      const mimeType = offer.author && offer.author[`mime-type`];

      if (!avatar) {
        throw new NotFoundError(`There is no avatar for this offer`);
      }

      const {info, stream} = await this.offersRouter.imageStore.get(date) || {};
      if (!info) {
        throw new NotFoundError(`File ${avatar.path} not found`);
      }

      if (!stream) {
        logger.error(`Loading image error ${avatar.path}`);
        throw new InternalServerError(`File not found`);
      }

      res.set(`content-type`, mimeType);
      res.set(`content-length`, info.length);

      return {res, stream};
    });

    this.add = async(async (req) => {
      const data = req.body;
      console.log(`HELOOOOOOOOO!!!!`);
      const avatar = (req.files[`avatar`] || {})[0];
      const photos = req.files[`photos`] || [];

      data.date = new Date().getTime();
      const filename = data.date;
      if (avatar) {
        await this.offersRouter.imageStore.save(filename, createStreamFromBuffer(avatar.buffer));
        data.avatar = `api/offers/${filename}/avatar`;
        data.avatarMimeType = avatar.mimetype;
      }

      data.photos = [];
      let index = 1;
      for (let photo of photos) {
        await this.offersRouter.photoStore.save(`${filename}/${index}`, createStreamFromBuffer(photo.buffer));
        data.photos.push({
          photo: `api/offers/${filename}/photo/${index}`,
          mimetype: photo.mimetype
        });
        index = index + 1;
      }
      await this.offersRouter.store.save(data);

      return data;
    });
  }
}

module.exports = (store) => new Offer(store);
