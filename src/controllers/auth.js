import * as authServices from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser

  });
};

export const loginController = async (req, res) => {

    const session = await authServices.login(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now()+ session.refreshTokenValidUntil)
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now()+ session.refreshTokenValidUntil)
    });

    res.json(
        {
            status: 200,
            message: "Successfully logged in an user!",
            data: {accessToken: session.accessToken},
        }
    );

 };
