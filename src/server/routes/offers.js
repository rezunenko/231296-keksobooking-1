const BAD_REQUEST = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;
const {getElements} = require(`../../commands/generator`);
const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const async = require(`../../utils/async`);
const {validateSchema, isCorrectIntValue} = require(`../../utils/validator`);
const offerSchema = require(`./validation`);
const ValidationError = require(`../errors/validation-error`);
const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

offersRouter.get(``, async(async (req, res) => {
  const {skip, limit} = req.query;
  if (!isCorrectIntValue(skip, 0, 20) || !isCorrectIntValue(limit, 0, 20)) {
    res.statusCode(BAD_REQUEST).send({
      error: `Validation error`,
      fieldName: `skip or limit`,
      errorMessage: `incorrect request ${req.query}`
    });
  } else {
    const offers = getElements(5, +skip, +limit);
    res.send(offers);
  }

  res.end();
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const offers = getElements(5);
  const date = +req.params[`date`];
  const offer = offers.data.find((item) => item.date === date);

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
  const offers = getElements(5);
  const date = +req.params[`date`];
  const filteredData = offers.data.find((item) => item.date === date);
  if (!filteredData) {
    res.status(BAD_REQUEST).send({
      error: `Bad request`,
      fieldName: `Offer`,
      errorMessage: `Offer is undefined`
    }).end();

    return false;
  }

  if (!filteredData.author || !filteredData.author.avatar) {
    res.status(NOT_FOUND_CODE).send({
      error: `Bad request`,
      fieldName: `Avatar`,
      errorMessage: `Avatar is undefined`
    }).end();
  }

  res.send(filteredData.author.avatar).end();
  return true;
}));

offersRouter.post(``, upload.single(`avatar`), (req, res) => {
  const data = req.body;
  const errors = validateSchema(data, offerSchema);

  if (errors.length > 0) {
    console.error(errors);
    throw new ValidationError(errors);
  }
  res.send(req.body);
});

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

module.exports = offersRouter;
