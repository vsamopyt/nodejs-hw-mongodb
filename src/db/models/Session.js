import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateOptions } from './hooks.js';


const sessionSchema = new Schema(
  {
    userId:{
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    accessToken: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    accessTokenValidUntil: {
        type: Date,
        require: true
    },
    refreshTokenValidUntil: {
        type: Date,
        require: true
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handleSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateOptions);
sessionSchema.post('findOneAndUpdate', handleSaveError);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
