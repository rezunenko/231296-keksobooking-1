const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const async = require(`../../utils/async`);
const {postSchema, getSchema} = require(`./validation`);
const NotFoundError = require(`../errors/not-found-error`);
const InternalServerError = require(`../errors/internal-server-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const offersRouter = new Router();
const {Duplex} = require(`stream`);
const logger = require(`../../winston`);
const {defaultHandler, validateRequestQueryParams, validateRequestBodyParams, imageHandler} = require(`../middleware/index`);

offersRouter.use(bodyParser.json());
offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const upload = multer({storage: multer.memoryStorage()});

const createStreamFromBuffer = (buffer) => {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const getOffers = async(async (req) => {
  const {skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT} = req.query;

  return await offersRouter.store.getAll(+skip, +limit);
});

const getOffer = async(async (req) => {
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

const addOffer = async(async (req) => {
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

offersRouter.get(``, validateRequestQueryParams(getSchema), defaultHandler(getOffers));
offersRouter.get(`/:date`, defaultHandler(getOffer));
offersRouter.get(`/:date/avatar`, imageHandler(getAvatar));
offersRouter.post(``, upload.single(`avatar`), validateRequestBodyParams(postSchema), defaultHandler(addOffer));

module.exports = (store, imageStore) => {
  offersRouter.store = store;
  offersRouter.imageStore = imageStore;

  return offersRouter;
};
