import { Schema, model } from 'mongoose';
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
  },
  isFavourite: {
    type: Boolean,
    default: false,
    required: true,
  },
  contactType: {
    type: String,
    default: 'personal',
    emit: ['work', 'home', 'personal'],
    required: true,
  },
}, { versionKey: false, timestamps: true,});

const contactCollection = model("contact", contactSchema );

export default contactCollection;
