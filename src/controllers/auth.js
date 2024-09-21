
import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};


export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};


export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });

//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });

setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};


export const refreshController =async(req,res)=>{
const {refreshToken, sessionId} =req.cookies;

console.log(refreshToken, sessionId);
const session = await authServices.refreshSession({refreshToken, sessionId});

// res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });

//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expire: new Date(Date.now() + session.refreshTokenValidUntil),
//   });

setupSession(res, session);

res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });

};

