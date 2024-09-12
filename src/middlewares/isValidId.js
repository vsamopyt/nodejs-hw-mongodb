import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {

    //variant 1
    return next(createHttpError(404, `${contactId} is not valid id`));
    // variant 2
    //  throw createHttpError(404, `${contactId} is not valid id`);
  }

  next();
};

export default isValidId;
