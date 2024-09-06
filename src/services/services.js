import contactCollection from '../db/models/Contact.js';

export const getAllContacts = () => contactCollection.find();

export const getContactbyId = (id) => contactCollection.findById(id);

export const createContact = (payload) => contactCollection.create(payload);

// export const updateContact = async (filter, data, options = {}) => {
//   const rawResult = await contactCollection.findOneAndUpdate(filter, data, {
//     new: true,
//     includeResultMetadata: true,
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
    new: true,
    ...options,
  });
};

export const deleteContact = (filter) => {
  return contactCollection.findOneAndDelete(filter);
};
