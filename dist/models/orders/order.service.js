"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const exception_1 = require("../../errorHandler/exception");
const product_service_1 = __importDefault(require("../products/product.service"));
const data_source_1 = require("../../data-source");
const Order_entity_1 = require("../../entity/Order.entity");
const types_1 = require("../../errorHandler/types");
class OrderService {
    async createOrder(orderData) {
        const productIds = orderData.products.map(product => product.productId);
        const products = await product_service_1.default.getMany(productIds);
        const ids = products.map(product => product.id);
        const arraysAreEqual = lodash_1.default.isEqual(lodash_1.default.sortBy(ids), lodash_1.default.sortBy(productIds));
        if (!arraysAreEqual) {
            throw new exception_1.Exception(types_1.HTTPStatus.NotFound, { message: 'Products not found' });
        }
        const orderRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        const dataForSave = orderData.products.map(p => {
            const product = products.find(prod => prod.id === p.productId);
            if (!product) {
                throw new exception_1.Exception(types_1.HTTPStatus.NotFound, { message: '`Product with ID ${p.productId} not found`' });
            }
            return orderRepository.create({
                userId: orderData.userId,
                productId: p.productId,
                quantity: p.quantity,
                total: product.price * p.quantity
            });
        });
        await orderRepository.save(dataForSave);
    }
    async getOrder(userId, orderId) {
        const orderRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        return orderRepository.findOne({
            where: {
                userId,
                id: orderId
            },
            relations: ['product'],
        });
    }
    async getOrders(userId) {
        const orderRepository = data_source_1.AppDataSource.getRepository(Order_entity_1.Order);
        return orderRepository.find({
            where: {
                userId
            }
        });
    }
}
const orderService = new OrderService();
exports.default = orderService;
