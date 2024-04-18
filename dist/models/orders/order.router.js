"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validation_1 = __importDefault(require("./validation"));
const order_controller_1 = __importDefault(require("./order.controller"));
const orderRouter = (0, express_1.Router)();
orderRouter.use(auth_middleware_1.authMiddleware);
orderRouter
    .post('/', validation_1.default.createOrder, order_controller_1.default.createOrder)
    .get('/', order_controller_1.default.getOrders);
orderRouter.get('/:orderId', validation_1.default.getOrder, order_controller_1.default.getOrder);
exports.default = orderRouter;
