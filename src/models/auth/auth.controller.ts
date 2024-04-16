import {Response, NextFunction, Request} from 'express';
import {SignUpDto} from "./dto/signUp.dto";
import {SignInDto} from "./dto/signIn.dto";
import authService from "./auth.service";
import {HTTPStatus} from "../../errorHandler/types";
import {User} from "../../entity/User.entity";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        const {email, password, name} = req.body;

        try {
            const signupData: SignUpDto = new SignUpDto(email, password, name);

            const response: User = await authService.signUp(signupData);


            res.status(HTTPStatus.Created).json({
                message: 'User created successfully', // todo move to constants
                data: {
                    id: response.id,
                    email: response.email,
                    name: response.name
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const loginData = new SignInDto(req.body.email, req.body.password);

            const response: {
                user: IUserResponse,
                accessToken: string
            } = await authService.signIn(loginData.email, loginData.password);

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