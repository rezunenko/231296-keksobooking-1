const {validateSchema} = require(`../../utils/validator`);
const BadRequestError = require(`../errors/bad-request-error`);
const InternalServerError = require(`../errors/internal-server-error`);
const NotImplementedError = require(`../errors/not-implemented-error`);
const NotFoundError = require(`../errors/not-found-error`);
const logger = require(`../../winston`);

const defaultHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    logger.log(`debug`, `Success request ${req.baseUrl}`);

    return res.json(result);
  } catch (ex) {

    return next(ex);
  }
};

const imageHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    logger.log(`debug`, `Success load image`);
    return result.stream.pipe(result.res);
  } catch (ex) {

    return next(ex);
  }
};

const setContentType = (req, res) => {
  if (req.get(`Accept`) && req.get(`Accept`).includes(`text/html`)) {
    res.set(`Content-Type`, `text/html`);
  } else {
    res.set(`Content-Type`, `application/json`);
  }
};

const clientErrorHandler = (err, req, res, next) => {
  if (err.name === `MongoError`) {
    err = new BadRequestError({errorMessage: `Offer is already exists`});
  }
  if ((err instanceof NotFoundError) || (err instanceof BadRequestError)) {
    logger.error(err, err.message);
    res.status(err.statusCode);
    setContentType(req, res);
    res.send(err.showError());
  } else {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof NotImplementedError)) {
    err = new InternalServerError();
    logger.error(err, `Unexpected error occurred`);
  } else {
    logger.error(err, `Not implemented method`);
  }
  setContentType(req, res);
  res.status(err.statusCode);
  res.json(err.showError());
  next();
};

const validateRequestQueryParams = (schema) => async (req, res, next) => {
  const errors = validateSchema(req.query, schema);
  if (errors.length > 0) {

    return next(new BadRequestError(errors));
  }

  return next();
};

const validateRequestBodyParams = (schema) => async (req, res, next) => {
  const errors = validateSchema(req.body, schema);
  if (errors.length > 0) {

    return next(new BadRequestError(errors));
  }

  return next();
};

module.exports = {
  defaultHandler,
  imageHandler,
  clientErrorHandler,
  errorHandler,
  validateRequestQueryParams,
  validateRequestBodyParams
};
