import * as contactServices from "../services/services.js";

export const getAllContactsController = async (reg, res) => {
    const data = await contactServices.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
  };

export const getContactbyIdController = async (reg, res) => {
    const { contactId } = reg.params;
    const data = await contactServices.getContactbyId(contactId);

    if (!data) {
      return res.status(404).json({
        message: 'contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: data,
    });
  };

