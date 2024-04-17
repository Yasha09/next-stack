"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("./order.service"));
const types_1 = require("../../errorHandler/types");
class OrderController {
    async createOrder(req, res, next) {
        try {
            const { products } = req.body;
            const response = await order_service_1.default.createOrder({ userId: req.user.id, products });
            res.status(types_1.HTTPStatus.Created).json({
                message: 'User created successfully',
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getOrder(req, res, next) {
        try {
            const { orderId } = req.params;
            const response = await order_service_1.default.getOrder(req.user.userId, Number(orderId));
            if (!response) {
                res.status(types_1.HTTPStatus.NotFound).json({
                    message: 'Order not found'
                });
                return;
            }
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Order fetched successfully',
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getOrders(req, res, next) {
        try {
            const response = await order_service_1.default.getOrders(req.user.userId);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Orders fetched successfully',
                data: response
            });
        }
        catch (error) {
            next(error);
        }
    }
}
const orderController = new OrderController();
exports.default = orderController;
