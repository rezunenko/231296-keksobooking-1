const OK = 200;
const BAD_REQUEST = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;
const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const async = require(`../../utils/async`);
const {validateSchema, isCorrectIntValue} = require(`../../utils/validator`);
const offerSchema = require(`./validation`);
const ValidationError = require(`../errors/validation-error`);
const offersRouter = new Router();
const {Duplex} = require(`stream`);
const logger = require(`../../../winston`);

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const createStreamFromBuffer = (buffer) => {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

offersRouter.get(``, async(async (req, res) => {
  const {skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT} = req.query;
  if (!isCorrectIntValue(skip, SKIP_DEFAULT, LIMIT_DEFAULT) || !isCorrectIntValue(limit, SKIP_DEFAULT, LIMIT_DEFAULT)) {
    res.statusCode(BAD_REQUEST).send({
      error: `Validation error`,
      fieldName: `skip or limit`,
      errorMessage: `incorrect request ${req.query}`
    });
  } else {
    const offers = await offersRouter.store.getAllOffers(+skip, +limit);
    res.send(offers);
  }

  res.end();
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const date = +req.params[`date`];
  const offer = await offersRouter.store.getOffer(date);

  if (!offer) {
    res.statusCode(NOT_FOUND_CODE).send({
      error: `Not found`,
      errorMessage: `Offer ${date} not found`
    }).end();

    return false;
  }
  res.send(offer).end();

  return true;
}));

offersRouter.get(`/:date/avatar`, async(async (req, res) => {
  const date = +req.params[`date`];
  const offer = await offersRouter.store.getOffer(date);

  if (!offer) {
    res.status(BAD_REQUEST).send({
      error: `Bad request`,
      fieldName: `Offer`,
      errorMessage: `Offer is undefined`
    }).end();

    return false;
  }
  const avatar = offer.author && offer.author.avatar;
  const mimeType = offer.author && offer.author[`mime-type`];
  const {info, stream} = await offersRouter.imageStore.get(date);

  if (!avatar || !info) {
    res.status(NOT_FOUND_CODE).send({
      error: `Bad request`,
      fieldName: `Avatar`,
      errorMessage: `Avatar is undefined`
    }).end();
  }
  res.set(`content-type`, mimeType);
  res.set(`content-length`, info.length);
  res.status(OK);
  stream.pipe(res);
  return true;
}));

offersRouter.post(``, upload.single(`avatar`), async(async (req, res) => {
  const data = req.body;
  const avatar = req.file;
  if (avatar) {
    data.avatar = avatar;
  }
  const errors = validateSchema(data, offerSchema);

  if (errors.length > 0) {
    logger.error(errors);
    throw new ValidationError(errors);
  }

  data.date = new Date().getTime();
  const filename = data.date;
  if (avatar) {
    await offersRouter.imageStore.save(filename, createStreamFromBuffer(avatar.buffer));
    data.avatar = `api/offers/${filename}/avatar`;
    data.avatarMimeType = `image/png`;
  }
  await offersRouter.store.save(data);
  res.send(data).end();
}));

offersRouter.use((exception, req, res, next) => {
  let data = exception;
  if (data !== 1) {
    data = exception.errors;
    res.status(400).send(data);
  } else {
    res.status(500);
  }
  next();
});

offersRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
    res.status(BAD_REQUEST).send(data);
    next();
    return false;
  }
  res.status(INTERNAL_SERVER_ERROR).send({
    error: `Internal Error`,
    errorMessage: `Server has fallen into unrecoverable problem.`
  }).end();
  return false;
});

module.exports = (store, imageStore) => {
  offersRouter.store = store;
  offersRouter.imageStore = imageStore;

  return offersRouter;
};
