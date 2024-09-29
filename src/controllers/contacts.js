import createHttpError from 'http-errors';
import * as contactServices from '../services/services.js';
import { sortFields } from '../db/models/Contact.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactsFilterParams from '../utils/filters/parseContactsFilterParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import deleteFileInUploadDir from '../utils/deleteFileInUploadDir.js';
import { env } from '../utils/env.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import deleteFileFromCloudinary from '../utils/deleteFileFromCloudinary.js';

let enableCloudinary = env('ENABLE_CLOUDINARY');

console.log(env('ENABLE_CLOUDINARY'));

export const getAllContactsController = async (reg, res) => {
  const { perPage, page } = parsePaginationParams(reg.query);
  const { sortBy, sortOrder } = parseSortParams({ ...reg.query, sortFields });
  const filter = parseContactsFilterParams(reg.query);
  const { _id: userId } = reg.user;

  const data = await contactServices.getAllContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactbyIdController = async (reg, res) => {
  const { contactId } = reg.params;
  const { _id: userId } = reg.user;

  console.log(contactId, userId);

  const data = await contactServices.getContact({ _id: contactId, userId });

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
  // const enableCloudinary = env("ENABLE_CLOUDINARY");

  let photo;
  if (reg.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(reg.file, 'contacts');
    } else {
      photo = await saveFileToUploadDir(reg.file);
    }
  }

  const { _id: userId } = reg.user;

  const data = await contactServices.createContact({
    ...reg.body,
    userId,
    photo,
  });
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
  const { _id: userId } = reg.user;

  let newPhoto;

  const contact = await contactServices.getFileName({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw createHttpError(404, `contact with id ${contactId} not found`);
  }

  if (reg.file) {
    const { photo } = contact;

    if (enableCloudinary === 'true') {
      newPhoto = await saveFileToCloudinary(reg.file, 'contacts');

      if (photo) {
        const isCloudanary = photo.includes('cloudinary.com');

        if (isCloudanary) {
          const publicId = photo.slice(
            photo.lastIndexOf('/'),
            photo.lastIndexOf('.'),
          );
          await deleteFileFromCloudinary(`contacts${publicId}`);
        } else {
          await deleteFileInUploadDir(photo);
        }
      }
    } else {
      newPhoto = await saveFileToUploadDir(reg.file);
      if (photo) {
        const isCloudanary = photo.includes('cloudinary.com');

        if (!isCloudanary) {
          await deleteFileInUploadDir(photo);
        } else {
          const publicId = photo.slice(
            photo.lastIndexOf('/'),
            photo.lastIndexOf('.'),
          );
          await deleteFileFromCloudinary(`contacts${publicId}`);
        }
      }
    }
  }

  const data = await contactServices.patchContact(
    { _id: contactId, userId },
    { ...reg.body, photo: newPhoto },
  );

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data,
  });
};

export const deleteContactController = async (reg, res) => {
  const { contactId } = reg.params;
  const { _id: userId } = reg.user;
  const data = await contactServices.deleteContact({ _id: contactId, userId });
  if (!data) {
    throw createHttpError(404, `contact with id ${contactId} not found`);
  }
  res.status(204).send();
};
