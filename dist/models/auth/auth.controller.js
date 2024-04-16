"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signUp_dto_1 = require("./dto/signUp.dto");
const signIn_dto_1 = require("./dto/signIn.dto");
const auth_service_1 = __importDefault(require("./auth.service"));
const types_1 = require("../../errorHandler/types");
class AuthController {
    async signUp(req, res, next) {
        const { email, password, name } = req.body;
        try {
            const signupData = new signUp_dto_1.SignUpDto(email, password, name);
            const response = await auth_service_1.default.signUp(signupData);
            res.status(types_1.HTTPStatus.Created).json({
                message: 'User created successfully', // todo move to constants
                data: {
                    id: response.id,
                    email: response.email,
                    name: response.name
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async signIn(req, res, next) {
        try {
            const loginData = new signIn_dto_1.SignInDto(req.body.email, req.body.password);
            const response = await auth_service_1.default.signIn(loginData.email, loginData.password);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'User logged in successfully',
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}
const authController = new AuthController();
exports.default = authController;
