"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../../../configs"));
const exception_1 = require("../../../errorHandler/exception");
const errorMessages_1 = __importDefault(require("../../../common/constants/errorMessages"));
const types_1 = require("../../../errorHandler/types");
class AccessTokenModel {
    async create(user) {
        try {
            return jsonwebtoken_1.default.sign({ id: user.id }, configs_1.default.JWT_SECRET, {
                expiresIn: `${configs_1.default.JWT_EXPIRATION_DATE}`,
            });
        }
        catch (error) {
            throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, {
                message: errorMessages_1.default.unAuthenticated,
            });
        }
    }
    async verify(token) {
        try {
            return await new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, configs_1.default.JWT_SECRET, (error, userPayload) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(userPayload);
                });
            });
        }
        catch (error) {
            throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, {
                message: errorMessages_1.default.unAuthenticated,
            });
        }
    }
}
const accessTokenModel = new AccessTokenModel();
exports.default = accessTokenModel;
