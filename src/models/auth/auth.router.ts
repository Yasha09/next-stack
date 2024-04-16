import {Router} from "express";

import authValidator from "./validation";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", authValidator.register, authController.signUp);

authRouter.post("/signin", authValidator.login, authController.signIn);


export default authRouter;