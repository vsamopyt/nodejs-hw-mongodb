import * as authController from "../controllers/auth.js";
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as usersValidateSchema from "../validation/users.js";
import validateBody from '../utils/validateBody.js';



const authRouter = Router();

authRouter.post('/register', validateBody(usersValidateSchema.usersSignupSchema), ctrlWrapper(authController.signupController));

authRouter.post('/login', validateBody(usersValidateSchema.usersLoginSchema), ctrlWrapper(authController.loginController));

authRouter.post("/refresh", ctrlWrapper(authController.refreshController));

authRouter.post("/logout", ctrlWrapper(authController.signoutController) );

export default authRouter;
