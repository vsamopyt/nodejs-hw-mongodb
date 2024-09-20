import * as contactServices from '../services/services.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from "../db/models/Contact.js";
import parseContactsFilterParams from '../utils/filters/parseContactsFilterParams.js';



export const getAllContactsController = async (reg, res) => {

  const {perPage, page} = parsePaginationParams(reg.query);
  const {sortBy, sortOrder} = parseSortParams({...reg.query, sortFields});
  const filter = parseContactsFilterParams(reg.query);
  const { _id:userId} = reg.user;

  const data = await contactServices.getAllContacts({perPage, page, sortBy, sortOrder, filter: {...filter, userId}});

    res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data:  data
  });
};



export const getContactbyIdController = async (reg, res) => {
  const { contactId } = reg.params;
  const { _id:userId} = reg.user;

  console.log(contactId, userId);


  const data = await contactServices.getContact({_id: contactId, userId});

  if (!data) {
    throw createHttpError(404, `contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: data,
  });
};

export const addContactController = async (reg, res) => {

  const { _id:userId} = reg.user;

  const data = await contactServices.createContact({...reg.body, userId});
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: data,
  });


};

// export const upsertContactController = async (reg, res) => {
//   const { contactId } = reg.params;
// const {_id: userId} =reg.user;
//   console.log(reg.body);

//   const {isNew, data} = await contactServices.updateContact(
//     { _id: contactId, userId },
//     reg.body,
//     {upsert: true}
//   );

//   console.log(isNew);
//   console.log(data);

// const status = isNew? 201: 200;

//   res.status(status).json({
//     status: status,
//     message: 'Successfully patched a contact!',
//     data: data,
//   });
// };

export const updateContactController = async (reg, res) => {
  const { contactId } = reg.params;
  const {_id: userId} =reg.user;
  const data = await contactServices.patchContact({ _id: contactId, userId}, reg.body);
  if (!data) {
    throw createHttpError(404, `contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data,
  });
};

export const deleteContactController = async (reg, res) => {
  const { contactId } = reg.params;
  const {_id: userId} =reg.user;
  const data = await contactServices.deleteContact({ _id: contactId, userId });
  if (!data) {
    throw createHttpError(404, `contact with id ${contactId} not found`);
  }
  res.status(204).send();
};
