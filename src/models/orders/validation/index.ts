import {NextFunction, Request, Response} from 'express';
import Joi from "joi";
import Validator from "../../../validation/validation";

const orderValidation = {
    createOrder(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            products: Joi.array().items(Joi.object({
                productId: Joi.number().positive().required().label('ProductId'),
                quantity: Joi.number().required()
            })).required()
        });
        validator.validate(req.body);
        next();
    },

    getOrder(req: Request, res: Response, next: NextFunction) {
        const validator = new Validator({
            orderId: Joi.number().positive().required().label('OrderId')
        });
        validator.validate(req.params);
        next();
    }
}

export default orderValidation;