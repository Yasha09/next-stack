"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("../../../validation/validation"));
const productValidator = {
    create(req, res, next) {
        const validator = new validation_1.default({
            name: joi_1.default.string().required().label('Name'),
            description: joi_1.default.string().optional().label('Description'),
            price: joi_1.default.number().required().label('Price'),
        });
        validator.validate(req.body);
        next();
    },
    getAll(req, res, next) {
        const validator = new validation_1.default({
            limit: joi_1.default.number().integer().min(1).max(100).default(10).optional().label('Limit'),
            page: joi_1.default.number().integer().min(1).default(1).optional().label('Page'),
        });
        validator.validate(req.query);
        next();
    },
    getOne(req, res, next) {
        const validator = new validation_1.default({
            id: joi_1.default.number().positive().required().label('Id'),
        });
        validator.validate(req.params);
        next();
    },
    update(req, res, next) {
        const validator = new validation_1.default({
            id: joi_1.default.number().positive().required().label('Id'),
            name: joi_1.default.string().required().label('Name'),
            description: joi_1.default.string().optional().label('Description'),
            price: joi_1.default.number().required().label('Price'),
        });
        validator.validate(req.body);
        next();
    }
};
exports.default = productValidator;
