const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const async = require(`../../utils/async`);
const NotFoundError = require(`../errors/not-found-error`);
const InternalServerError = require(`../errors/internal-server-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const createStreamFromBuffer = require(`../../utils/stream-from-buffer`);
const logger = require(`../../winston`);
let offersRouter = null;

const getAll = async(async (req) => {
  const {skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT} = req.query;

  return await offersRouter.store.getAll(+skip, +limit);
});

const get = async(async (req) => {
  const date = +req.params[`date`];
  const offer = await offersRouter.store.get(date);

  if (!offer) {
    throw new NotFoundError(`There is no offer for ${date} date`);
  }

  return offer;
});

const getAvatar = async(async (req, res) => {
  const date = +req.params[`date`];
  const offer = await offersRouter.store.get(date);

  if (!offer) {
    throw new BadRequestError(`Offer wasn't found`);
  }

  const avatar = offer.author && offer.author.avatar;
  const mimeType = offer.author && offer.author[`mime-type`];

  if (!avatar) {
    throw new NotFoundError(`There is no avatar for this offer`);
  }

  const {info, stream} = await offersRouter.imageStore.get(date) || {};
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

const add = async(async (req) => {
  const data = req.body;
  const avatar = req.file;
  if (avatar) {
    data.avatar = avatar;
  }

  data.date = new Date().getTime();
  const filename = data.date;
  if (avatar) {
    await offersRouter.imageStore.save(filename, createStreamFromBuffer(avatar.buffer));
    data.avatar = `api/offers/${filename}/avatar`;
    data.avatarMimeType = `image/png`;
  }
  await offersRouter.store.save(data);

  return data;
});

module.exports = (store) => {
  offersRouter = store;

  return {
    getAll,
    get,
    add,
    getAvatar
  };
};
