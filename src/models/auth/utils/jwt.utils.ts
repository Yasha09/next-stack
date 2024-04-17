import jwt from 'jsonwebtoken';

import {User} from "../../../entity/User.entity";
import config from '../../../configs'
import {Exception} from "../../../errorHandler/exception";
import errorMessages from "../../../common/constants/errorMessages";
import {HTTPStatus} from "../../../errorHandler/types";

class AccessTokenModel {
    async create(user: User): Promise<string> {
        try {
            return jwt.sign(
                {id: user.id},
                config.JWT_SECRET,
                {
                    expiresIn: `${config.JWT_EXPIRATION_DATE}`,

                }
            );
        } catch (error) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }
    }

    async verify(token: string): Promise<jwt.JwtPayload> {
        try {
            return await new Promise((resolve, reject) => {
                jwt.verify(token, config.JWT_SECRET, (error, userPayload) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(userPayload as jwt.JwtPayload);
                });
            });
        } catch (error) {
            throw new Exception(HTTPStatus.Unauthorized, {
                message: errorMessages.unAuthenticated,
            });
        }
    }
}

const accessTokenModel = new AccessTokenModel();
export default accessTokenModel;