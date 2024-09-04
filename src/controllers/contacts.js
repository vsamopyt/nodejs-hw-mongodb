import * as contactServices from '../services/services.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (reg, res) => {
//   try {
    const data = await contactServices.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
//   } catch (error) {
//     next(error);

//   }
};

export const getContactbyIdController = async (reg, res) => {
//   try {
    const { contactId } = reg.params;
    const data = await contactServices.getContactbyId(contactId);

    if (!data) {
        throw createHttpError(404,`contact with id ${contactId} not found`);

    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: data,
    });
//   } catch (error) {
//     next(error);

//   }
};
