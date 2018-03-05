const {getElements} = require(`../src/generator`);
const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const async = require(`../src/utils/async`);
const BAD_REQUEST = 400;
const NOT_FOUND_CODE = 404;
const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

function isCorrectIntValue(value, min, max) {

  return value && isFinite(+value) && value >= min && value <= max;
}

offersRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;
  if (!isCorrectIntValue(skip, 0, 20) || !isCorrectIntValue(limit, 0, 20)) {
    res.statusCode(BAD_REQUEST).send(`Incorrect request ${req.query}`);
  }
  const offers = getElements(5, +skip, +limit);
  res.send(offers);
});

offersRouter.get(`/:date`, async(async (req, res) => {
  const offers = getElements(5);
  const date = +req.params[`date`];
  const offer = offers.data.find((item) => item.date === date);

  if (!offer) {
    res.statusCode(NOT_FOUND_CODE).send(`Offer with date ${date} not found`);
  }

  res.send(offer);
}));

offersRouter.get(`/:date/avatar`, (req, res) => {
  const offers = getElements(5);
  const date = +req.params[`date`];
  const filteredData = offers.data.find((item) => item.date === date);
  if (!filteredData) {
    res.status(BAD_REQUEST).send(`Offer is undefined`);
  }

  if (!filteredData.author || !filteredData.author.avatar) {
    res.status(NOT_FOUND_CODE).send(`Avatar is undefined`);
  }

  res.send(filteredData.author.avatar);
});

offersRouter.post(``, upload.none(), (req, res) => {
  const data = req.body;
  // const errors = validateSchema(data, schema);

  // if (errors.length > 0) {
  //   throw new ValidationError(errors);
  // }

  res.send(data);
});

offersRouter.post(`/:date/avatar`, upload.none(), (req, res) => {
  // TODO сделать корректную обработку запроса
  res.send(req.body);
});

offersRouter.use((exception, req, res, next) => {
  let data = exception;
  // if (exception instanceof ValidationError) {
  //   data = exception.errors;
  // }

  res.statusCode(BAD_REQUEST).send(data);
  next();
});

module.exports = offersRouter;
