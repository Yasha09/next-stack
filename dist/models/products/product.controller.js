"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productDto_1 = require("./dto/productDto");
const product_service_1 = __importDefault(require("./product.service"));
const types_1 = require("../../errorHandler/types");
const pagination_params_1 = require("./utils/pagination-params");
class ProductController {
    async createOne(req, res, next) {
        try {
            const product = await product_service_1.default.createOne(req.body);
            res.status(types_1.HTTPStatus.Created).json({
                message: 'Product created successfully',
                data: product
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const { page, limit } = (0, pagination_params_1.getPageParams)(req);
            const [products, total] = await product_service_1.default.getAll(limit, page);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Products fetched successfully',
                data: {
                    data: products,
                    total,
                    page,
                    last_page: Math.ceil(total / limit)
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const product = await product_service_1.default.getOne(id);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Product fetched successfully',
                data: product
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateOne(req, res, next) {
        try {
            const id = parseInt(req.body.id);
            const productData = new productDto_1.ProductDto(req.body.name, req.body.description, req.body.price);
            const product = await product_service_1.default.updateOne(id, productData);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Product updated successfully',
                data: product
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await product_service_1.default.deleteOne(id);
            res.status(types_1.HTTPStatus.OK).json({
                message: 'Product deleted successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
const productController = new ProductController();
exports.default = productController;
