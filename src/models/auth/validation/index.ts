import {NextFunction, Request, Response} from 'express';
import Joi from "joi";
import Validator from "../../../validation/validation";

const authValidator = {
    register(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            email: Joi.string().required().label('E-mail'),
            password: Joi.string()
                .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,30})"))                .required()
                .messages({
                    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
                    "string.empty": `Password cannot be empty`,
                    "any.required": `Password is required`,
                }),
            confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm Password').messages({
                "any.only": `Passwords do not match`,
                "any.required": `Confirm Password is required`,
            }),
            name: Joi.string().required().label('Name'),
        });
        validator.validate(req.body);
        next();
    },

    login(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            email: Joi.string().required().label('E-mail'),
            password: Joi.string().required().label('Password'),
        });
        validator.validate(req.body);
        next();
    },

};

export default authValidator;

