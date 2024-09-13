import contactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORTED_ORDER } from '../constants/index.js';
import parseSortParams from '../utils/parseSortParams.js';

// export const getAllContacts = () => contactCollection.find();

// export const getAllContacts = async (
//   perPage,
//   page,
//   sortBy = '_id',
//   sortOrder = SORTED_ORDER[0],
//   filter = {},
// ) => {
//   const skip = (page - 1) * perPage;
//   const limit = perPage;

//   const studentsQuery = contactCollection.find();

//   const data = await contactCollection
//     .find()
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder });
//   const count = await contactCollection.find().countDocuments();
//   const paginationData = calculatePaginationData(perPage, page, count);
//   return {
//     data,
//     page,
//     perPage,
//     totalItems: count,
//     ...paginationData,
//   };
// };


export const getAllContacts = async (
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORTED_ORDER[0],
  filter = {},
) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = contactCollection.find();

console.log("filter", filter.type, filter.isFavourite );


if(filter.type) {
  contactsQuery.where("contactType").equals(filter.type);
}  

console.log(typeof filter.isFavourite === 'boolean');

if(typeof filter.isFavourite === 'boolean') {
  contactsQuery.where("isFavourite").eq(filter.isFavourite);
}


 // const data = await contactCollection
  //   .find()
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder });


  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const count = await contactCollection.find().merge(contactsQuery).countDocuments();
  const paginationData = calculatePaginationData(perPage, page, count);
  return {
    data,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContactbyId = (id) => contactCollection.findById(id);

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
