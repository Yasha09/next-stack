"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const exception_1 = require("../errorHandler/exception");
const types_1 = require("../errorHandler/types");
const errorMessages_1 = __importDefault(require("../common/constants/errorMessages"));
const jwt_utils_1 = __importDefault(require("../models/auth/utils/jwt.utils"));
const user_service_1 = __importDefault(require("../models/users/user.service"));
const getAccessToken = (req) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, {
            message: errorMessages_1.default.unAuthenticated,
        });
    }
    return authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : authorization;
};
const getUserByPayload = async (userPayload) => {
    const user = await user_service_1.default.getOne({
        id: userPayload.id,
    });
    if (!user) {
        throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, {
            message: errorMessages_1.default.unAuthenticated,
        });
    }
    return user;
};
const authMiddleware = async (req, res, next) => {
    try {
        const token = getAccessToken(req);
        if (!token) {
            throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, {
                message: errorMessages_1.default.unAuthenticated,
            });
        }
        const userPayload = await jwt_utils_1.default.verify(token);
        req.user = await getUserByPayload(userPayload);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
