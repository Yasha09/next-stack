"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../users/user.service"));
const bcrypt_utils_1 = require("./utils/bcrypt.utils");
const jwt_utils_1 = __importDefault(require("./utils/jwt.utils"));
const exception_1 = require("../../errorHandler/exception");
const types_1 = require("../../errorHandler/types");
class AuthService {
    async signUp(userData) {
        const user = await user_service_1.default.getOne({ email: userData.email });
        if (user) {
            throw new exception_1.Exception(types_1.HTTPStatus.Conflict, { message: 'User already exists' });
        }
        const hashedPassword = await (0, bcrypt_utils_1.setPassword)(userData.password);
        return user_service_1.default.createOne({
            email: userData.email,
            name: userData.name,
            password: hashedPassword
        });
    }
    async signIn(signInData) {
        const { email, password } = signInData;
        const user = await user_service_1.default.getOne({ email });
        if (!user) {
            throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, { message: 'User not found' });
        }
        const isPasswordCorrect = await (0, bcrypt_utils_1.comparePasswords)(password, user.password);
        if (!isPasswordCorrect) {
            throw new exception_1.Exception(types_1.HTTPStatus.Unauthorized, { message: 'Invalid password' });
        }
        const accessToken = await jwt_utils_1.default.create(user);
        return {
            user: this.userResponse(user),
            accessToken
        };
    }
    userResponse(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    }
}
const authService = new AuthService();
exports.default = authService;
