import { Schema, model } from 'mongoose';
import { regexEmailPattern } from '../../constants/users.js';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      match: [
        regexEmailPattern,
        `email must be in pattern${regexEmailPattern}`,
      ],
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

usersSchema.post('save', handleSaveError);
usersSchema.pre('findOneAndUpdate', setUpdateOptions);
usersSchema.post('findOneAndUpdate', handleSaveError);

const UsersCollection = model('user', usersSchema);

export default UsersCollection;
