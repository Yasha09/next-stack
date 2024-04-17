import {AuthRequest} from "../common/interfaces";
import {NextFunction, Response} from "express";
import {JwtPayload} from 'jsonwebtoken';

import {Exception} from "../errorHandler/exception";
import {HTTPStatus} from "../errorHandler/types";
import errorMessages from "../common/constants/errorMessages";
import accessTokenModel from "../models/auth/utils/jwt.utils";
import {User} from "../entity/User.entity";
import userService from "../models/users/user.service";


const getAccessToken = (req: AuthRequest): string => {
    const {authorization} = req.headers;
    if (!authorization) {
        throw new Exception(HTTPStatus.Unauthorized, {
            message: errorMessages.unAuthenticated,
        });
    }
    return authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization
};

const getUserByPayload = async (userPayload: JwtPayload): Promise<User> => {

    const user: User | null = await userService.getOne({
        id: userPayload.id,
    });

    if (!user) {
        throw new Exception(HTTPStatus.Unauthorized, {
            message: errorMessages.unAuthenticated,
        });
    }

    return user;
};


export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = getAccessToken(req);
        if (!token) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }

        const userPayload = await accessTokenModel.verify(token);

        req.user = await getUserByPayload(userPayload);
        next();
    } catch (error) {
        next(error);
    }
}
