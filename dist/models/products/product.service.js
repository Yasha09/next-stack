"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_entity_1 = require("../../entity/Product.entity");
const data_source_1 = require("../../data-source");
const exception_1 = require("../../errorHandler/exception");
const typeorm_1 = require("typeorm");
class ProductService {
    async createOne(productData) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const isProductNameUnique = await productRepository.findOne({
            where: {
                name: productData.name
            }
        });
        if (isProductNameUnique) {
            throw new exception_1.Exception(400, { message: 'Product name already exists' });
        }
        const product = productRepository.create(productData);
        return productRepository.save(product);
    }
    async getAll(limit, page) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        return productRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: {
                id: "DESC"
            }
        });
    }
    async getOne(id) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productRepository.findOne({
            where: {
                id
            }
        });
        if (!product) {
            throw new exception_1.Exception(400, { message: 'Product not found' });
        }
        return product;
    }
    async updateOne(id, productData) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productRepository.findOne({
            where: {
                id
            }
        });
        if (!product) {
            throw new exception_1.Exception(400, { message: 'Product not found' });
        }
        return productRepository.save({
            ...product,
            ...productData
        });
    }
    async deleteOne(id) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        const product = await productRepository.findOne({
            where: {
                id
            }
        });
        if (!product) {
            throw new exception_1.Exception(400, { message: 'Product not found' });
        }
        await productRepository.remove(product);
    }
    async getMany(ids) {
        const productRepository = data_source_1.AppDataSource.getRepository(Product_entity_1.Product);
        return productRepository.find({
            where: {
                id: (0, typeorm_1.In)(ids)
            }
        });
    }
}
const productService = new ProductService();
exports.default = productService;
