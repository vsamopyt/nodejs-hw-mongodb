import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';
import UsersCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifetime,
  refreshTokinLifeTime,
} from '../constants/users.js';
import { log } from 'console';
// import { log } from 'console';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokinLifeTime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const signup = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UsersCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;

  return data._doc;
};

export const login = async (payload) => {
  const { email, password } = payload;
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password are invalid');
  }

  console.log();

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password are invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();
  const userSession = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });

  return userSession;
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const findUser = (filter) => UsersCollection.findOne(filter);

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  const sessionData = createSession();

  await SessionCollection.deleteOne({ _id: sessionId });

  const userSession = await SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });

  return userSession;
};

export const signout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  console.log(user);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const appDomain = env('APP_DOMAIN');
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '25m',
    },
  );

  try {
    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',

      html: `<p>Click <a href="https://${appDomain}/reset-password?token=${resetToken}">here</a> to reset your password!</p>`,
    });
  } catch (error) {
    console.log(error.message);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async(payload)=>{
  let entries;
  console.log(payload);
  

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, "Token is expired or invalid.");
    throw err;
  }

  console.log(entries);

const user = await UsersCollection.findOne({
  email: entries.email,
  _id: entries.sub
});

if(!user) {
  throw createHttpError(404, 'User not found!');
}

const encryptedPassword = await bcrypt.hash(payload.password, 10);

await UsersCollection.updateOne(
  {_id: user._id},
  {password: encryptedPassword}
);


   
  

};
