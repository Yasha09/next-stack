"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("../../../validation/validation"));
const orderValidation = {
    createOrder(req, res, next) {
        const validator = new validation_1.default({
            products: joi_1.default.array().items(joi_1.default.object({
                productId: joi_1.default.number().positive().required().label('ProductId'),
                quantity: joi_1.default.number().required()
            })).required()
        });
        validator.validate(req.body);
        next();
    },
    getOrder(req, res, next) {
        const validator = new validation_1.default({
            orderId: joi_1.default.number().positive().required().label('OrderId')
        });
        validator.validate(req.params);
        next();
    }
};
exports.default = orderValidation;
