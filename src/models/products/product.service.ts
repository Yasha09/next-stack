import {Product} from "../../entity/Product.entity";
import {AppDataSource} from "../../data-source";
import {Exception} from "../../errorHandler/exception";
import {In} from "typeorm";

class ProductService {
    async createOne(productData: IProductCreateOne): Promise<IProduct> {
        const productRepository = AppDataSource.getRepository(Product);

        const isProductNameUnique = await productRepository.findOne({
            where: {
                name: productData.name
            }
        });

        if (isProductNameUnique) {
            throw new Exception(400, {message: 'Product name already exists'});
        }


        const product = productRepository.create(productData);

        return productRepository.save(product);
    }

    async getAll(limit: number, page: number): Promise<[Product[], number]> {
        const productRepository = AppDataSource.getRepository(Product);

        return productRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: {
                id: "DESC"
            }
        });
    }

    async getOne(id: number): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new Exception(400, {message: 'Product not found'});
        }

        return product;
    }

    async updateOne(id: number, productData: {
        name: string,
        description: string,
        price: number,
    }): Promise<Product> {
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new Exception(400, {message: 'Product not found'});
        }

        return productRepository.save({
            ...product,
            ...productData
        });
    }

    async deleteOne(id: number): Promise<void> {
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id
            }
        });

        if (!product) {
            throw new Exception(400, {message: 'Product not found'});
        }

        await productRepository.remove(product);
    }


    async getMany(ids: number[]): Promise<Product[]> {
        const productRepository = AppDataSource.getRepository(Product);

        return productRepository.find({
            where: {
                id: In(ids)
            }
        });

    }
}

const productService = new ProductService();
export default productService;