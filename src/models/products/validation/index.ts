import {NextFunction, Request, Response} from 'express';
import Joi from "joi";
import Validator from "../../../validation/validation";

const productValidator = {
    create(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            name: Joi.string().required().label('Name'),
            description: Joi.string().optional().label('Description'),
            price: Joi.number().required().label('Price'),
        });
        validator.validate(req.body);
        next();
    },

    getAll(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            limit: Joi.number().integer().min(1).max(100).default(10).optional().label('Limit'),
            page: Joi.number().integer().min(1).default(1).optional().label('Page'),
        });
        validator.validate(req.query);
        next();
    },

    getOne(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            id: Joi.number().positive().required().label('Id'),
        });
        validator.validate(req.params);
        next();
    },

    update(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            id: Joi.number().positive().required().label('Id'),
            name: Joi.string().required().label('Name'),
            description: Joi.string().optional().label('Description'),
            price: Joi.number().required().label('Price'),
        });
        validator.validate(req.body);
        next();
    }


};

export default productValidator;

