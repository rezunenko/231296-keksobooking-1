const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {postSchema, getSchema} = require(`./validation`);
const offersRouter = new Router();
const offer = require(`./offer`)(offersRouter);
const {defaultHandler, validateRequestQueryParams, validateRequestBodyParams, imageHandler} = require(`../middleware/index`);

offersRouter.use(bodyParser.json());
offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const upload = multer({storage: multer.memoryStorage()});
const uploadConfig = upload.fields([{name: `avatar`, maxCount: 1}, {name: `photos`, maxCount: 12}]);

offersRouter.get(``, validateRequestQueryParams(getSchema), defaultHandler(offer.getAll));
offersRouter.get(`/:date`, defaultHandler(offer.get));
offersRouter.get(`/:date/avatar`, imageHandler(offer.getAvatar));
offersRouter.post(``, uploadConfig, validateRequestBodyParams(postSchema), defaultHandler(offer.add));

module.exports = (store, imageStore, photoStore) => {
  offersRouter.store = store;
  offersRouter.imageStore = imageStore;
  offersRouter.photoStore = photoStore;

  return offersRouter;
};
