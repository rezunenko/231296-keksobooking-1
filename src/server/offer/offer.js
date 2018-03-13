const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

const async = require(`../../utils/async`);
const NotFoundError = require(`../errors/not-found-error`);
const InternalServerError = require(`../errors/internal-server-error`);
const BadRequestError = require(`../errors/bad-request-error`);
const createStreamFromBuffer = require(`../../utils/stream-from-buffer`);
const logger = require(`../../winston`);


module.exports = (store) => {
  const offersRouter = store;

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

  const getPhoto = async(async (req, res) => {
    const date = +req.params[`date`];
    const id = +req.params[`id`];
    const data = await offersRouter.store.get(date);

    if (!data) {
      throw new BadRequestError(`Offer wasn't found`);
    }

    const photos = data.offer.photos;

    if (!photos) {
      throw new NotFoundError(`There is no avatar for this offer`);
    }

    const photoIndex = data.offer.photos.indexOf(`api/offers/${date}/photo/${id}`);
    const mimeType = data.offer.photosMimeType[photoIndex];

    const {info, stream} = await offersRouter.photoStore.get(`${date}/${id}`) || {};
    if (!info) {
      throw new NotFoundError(`File ${date}/${id} not found`);
    }

    if (!stream) {
      logger.error(`Loading photo error`);
      throw new InternalServerError(`File not found`);
    }

    res.set(`content-type`, mimeType);
    res.set(`content-length`, info.length);

    return {res, stream};
  });


  const add = async(async (req) => {
    const data = req.body;
    const avatar = (req.files[`avatar`] || {})[0];
    const photos = req.files[`photos`] || [];

    data.date = new Date().getTime();
    const filename = data.date;
    if (avatar) {
      await offersRouter.imageStore.save(filename, createStreamFromBuffer(avatar.buffer));
      data.avatar = `api/offers/${filename}/avatar`;
      data.avatarMimeType = avatar.mimetype;
    }

    data.photos = [];
    let index = 1;
    for (let photo of photos) {
      await offersRouter.photoStore.save(`${filename}/${index}`, createStreamFromBuffer(photo.buffer));
      data.photos.push({
        photo: `api/offers/${filename}/photo/${index}`,
        mimetype: photo.mimetype
      });
      index = index + 1;
    }
    await offersRouter.store.save(data);

    return data;
  });

  return {
    add,
    get,
    getAll,
    getAvatar,
    getPhoto
  };
};
