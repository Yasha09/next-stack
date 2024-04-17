import {NextFunction, Response} from "express";

import {ProductDto} from "./dto/productDto";
import {AuthRequest} from "../../common/interfaces";
import productService from "./product.service";
import {HTTPStatus} from "../../errorHandler/types";
import {getPageParams} from "./utils/pagination-params";


class ProductController {
    async createOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const productData = new ProductDto(req.body.name, req.body.description, req.body.price);
            const product = await productService.createOne(productData);
            res.status(HTTPStatus.Created).json({
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {page, limit} = getPageParams(req);

            const [products, total] = await productService.getAll(limit, page);

            res.status(HTTPStatus.OK).json({
                message: 'Products fetched successfully',
                data: {
                    data: products,
                    total,
                    page,
                    last_page: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            next(error)
        }
    }

    async getOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            console.log(id, "id")
            const product = await productService.getOne(id);
            res.status(HTTPStatus.OK).json({
                message: 'Product fetched successfully',
                data: product
            });
        } catch (error) {
            next(error)
        }
    }

    async updateOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.body.id);
            console.log(id, "id")
            const productData = new ProductDto(req.body.name, req.body.description, req.body.price);
            const product = await productService.updateOne(id, productData);
            res.status(HTTPStatus.OK).json({
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await productService.deleteOne(id);
            res.status(HTTPStatus.OK).json({
                message: 'Product deleted successfully'
            });
        } catch (error) {
            next(error)
        }
    }
}

const productController = new ProductController();
export default productController;