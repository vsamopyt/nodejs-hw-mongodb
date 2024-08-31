import contactCollection from "../db/models/Contact.js";
export const getAllContacts=()=> contactCollection.find();
export const getContactbyId =id=> contactCollection.findById(id);
