"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("../../../validation/validation"));
const authValidator = {
    register(req, res, next) {
        const validator = new validation_1.default({
            email: joi_1.default.string().required().label('E-mail'),
            password: joi_1.default.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,30})")).required()
                .messages({
                "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                "string.empty": `Password cannot be empty`,
                "any.required": `Password is required`,
            }),
            confirmPassword: joi_1.default.any().valid(joi_1.default.ref('password')).required().label('Confirm Password').messages({
                "any.only": `Passwords do not match`,
                "any.required": `Confirm Password is required`,
            }),
            name: joi_1.default.string().required().label('Name'),
        });
        validator.validate(req.body);
        next();
    },
    login(req, res, next) {
        const validator = new validation_1.default({
            email: joi_1.default.string().required().label('E-mail'),
            password: joi_1.default.string().required().label('Password'),
        });
        validator.validate(req.body);
        next();
    },
};
exports.default = authValidator;
