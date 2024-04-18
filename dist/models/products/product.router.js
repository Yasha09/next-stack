"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const product_controller_1 = __importDefault(require("./product.controller"));
const validation_1 = __importDefault(require("./validation"));
const productRouter = (0, express_1.Router)();
productRouter.use(auth_middleware_1.authMiddleware);
productRouter
    .post('/', validation_1.default.create, product_controller_1.default.createOne)
    .get('/', validation_1.default.getAll, product_controller_1.default.getAll)
    .patch('/', validation_1.default.update, product_controller_1.default.updateOne);
productRouter
    .get('/:id', validation_1.default.getOne, product_controller_1.default.getOne)
    .delete('/:id', validation_1.default.getOne, product_controller_1.default.deleteOne);
exports.default = productRouter;
