import { Schema, model } from 'mongoose';
import { typeList, emailRegexp } from '../../constants/contacts.js';
import {handleSaveError, setUpdateOptions} from "./hooks.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // match: [emailRegexp,`email must be in pattern${emailRegexp}`],
    // required: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
    required: true,
  },
  contactType: {
    type: String,
    default: 'personal',
    enum: typeList,
    required: true,
  },
}, { versionKey: false, timestamps: true,});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", setUpdateOptions);
contactSchema.post("findOneAndUpdate", handleSaveError);


const contactCollection = model("contact", contactSchema );
export const sortFields =["name", "phoneNumber", "email", "isFavourite",  "contactType", "createdAt", "updatedAt"];

export default contactCollection;
