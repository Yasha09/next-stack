import {Response, NextFunction, Request} from 'express';

import {SignInDto} from "./dto/signIn.dto";
import authService from "./auth.service";
import {HTTPStatus} from "../../errorHandler/types";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {

        try {
            const {name, email, id}: IUser = await authService.signUp(req.body);


            res.status(HTTPStatus.Created).json({
                message: 'User created successfully', // todo move to constants
                data: {
                    id, email, name
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData = new SignInDto(req.body.email, req.body.password);

            const response: ISignUpResponse = await authService.signIn({
                email: loginData.email,
                password: loginData.password
            });

            res.status(HTTPStatus.OK).json({
                message: 'User logged in successfully',
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();
export default authController;