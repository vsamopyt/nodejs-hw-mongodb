import contactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORTED_ORDER } from '../constants/index.js';
import parseSortParams from '../utils/parseSortParams.js';

export const getAllContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORTED_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = contactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').eq(filter.isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const count = await contactCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calculatePaginationData(perPage, page, count);

  return {
    data,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContact = filter => contactCollection.findOne(filter);

export const createContact = (payload) => contactCollection.create(payload);

// export const updateContact = async (filter, data, options = {}) => {
//   const rawResult = await contactCollection.findOneAndUpdate(filter, data, {
//     //new: true,
//     includeResultMetadata: true,
//     //runValidators: true,
//     ...options,
//   });
//   if (!rawResult || !rawResult.value) return null;

//   return {
//     data: rawResult.value,
//     isNew: Boolean(rawResult.lastErrorObject?.upserted),
//   };
// };

export const patchContact = (filter, data, options = {}) => {
  return contactCollection.findOneAndUpdate(filter, data, {
    // new: true,
    // runValidators: true,
    ...options,
  });
};

export const deleteContact = (filter) => {
  return contactCollection.findOneAndDelete(filter);
};
