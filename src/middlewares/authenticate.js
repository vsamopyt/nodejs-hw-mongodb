import createHttpError from 'http-errors';

import * as authServices from '../services/auth.js';

const authenticate = async (req, res, next) => {

  const { authorization } = req.headers; // the first way
  // const authorization  = res.get('Authorization') // the second way
  if(!authorization ) {
return next(createHttpError(401,"Autorization header not found"));
  }; // checking 1

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(createHttpError(401, "Autorization has not bearer type"));

  }; // checking 2

  const session = await authServices.findSessionByAccessToken(token);
  if(!session ) {
    return next(createHttpError(401, "Session not found"));
  };   // checking 3

  if (new Date()> session.accessTokenValidUntil) {
    return next(createHttpError(401, "Access Token expired"));
  }; // checking 4

  const user =await authServices.findUser({_id:session.userId});
  if(!user) {
    return next(createHttpError(401, "User not found"));
  } // checking 5

  req.user =user;

next();

};
export default authenticate;
