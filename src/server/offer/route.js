const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {postSchema, getSchema} = require(`./validation`);
const offersRouter = new Router();
const {getAll, get, add, getAvatar} = require(`./offer`)(offersRouter);
const {defaultHandler, validateRequestQueryParams, validateRequestBodyParams, imageHandler} = require(`../middleware/index`);

offersRouter.use(bodyParser.json());
offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const upload = multer({storage: multer.memoryStorage()});

offersRouter.get(``, validateRequestQueryParams(getSchema), defaultHandler(getAll));
offersRouter.get(`/:date`, defaultHandler(get));
offersRouter.get(`/:date/avatar`, imageHandler(getAvatar));
offersRouter.post(``, upload.single(`avatar`), validateRequestBodyParams(postSchema), defaultHandler(add));

module.exports = (store, imageStore) => {
  offersRouter.store = store;
  offersRouter.imageStore = imageStore;

  return offersRouter;
};
