import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';

import UsersCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifetime,
  refreshTokinLifeTime,
} from '../constants/users.js';

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
    throw createHttpError(401, 'email or password are invalid');
  }

  console.log();

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'email or password are invalid');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  // const accessToken = randomBytes(30).toString("base64");
  // const refreshToken = randomBytes(30).toString("base64");
  // const accessTokenValidUntil = new Date(Date.now()+ accessTokenLifetime) ;
  // const refreshTokenValidUntil = new Date(Date.now()+  refreshTokinLifeTime);

  const sessionData = createSession();
  const userSession = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil,
    // refreshTokenValidUntil
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
    // accessToken,
    // refreshToken,
    // accessTokenValidUntil,
    // refreshTokenValidUntil
  });

  return userSession;
};
