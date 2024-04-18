import _ from "lodash";

import {Exception} from "../../errorHandler/exception";
import productService from "../products/product.service";
import {AppDataSource} from "../../data-source";
import {Order} from "../../entity/Order.entity";
import {Product} from "../../entity/Product.entity";
import {HTTPStatus} from "../../errorHandler/types";

class OrderService {
    async createOrder(orderData: IOrderRequest): Promise<void> {
        const productIds: number[] = orderData.products.map(product => product.productId);
        const products: Product[] = await productService.getMany(productIds);

        const ids: number[] = products.map(product => product.id);
        const arraysAreEqual: boolean = _.isEqual(_.sortBy(ids), _.sortBy(productIds));

        if (!arraysAreEqual) {
            throw new Exception(HTTPStatus.NotFound, {message: 'Products not found'});
        }

        const orderRepository = AppDataSource.getRepository(Order);

        const dataForSave: Order[] = orderData.products.map(p => {
            const product = products.find(prod => prod.id === p.productId);

            if (!product) {
                throw new Exception(HTTPStatus.NotFound, {message: '`Product with ID ${p.productId} not found`'});
            }

            return orderRepository.create({
                userId: orderData.userId,
                productId: p.productId,
                quantity: p.quantity,
                total: product.price * p.quantity
            });
        })

        await orderRepository.save(dataForSave);
    }

    async getOrder(userId: number, orderId: number): Promise<IOrderResponse | null> {
        const orderRepository = AppDataSource.getRepository(Order);

        return orderRepository.findOne({
            where: {
                userId,
                id: orderId
            },
            relations: ['product'],
        });
    }

    async getOrders(userId: number): Promise<Order[]> {
        const orderRepository = AppDataSource.getRepository(Order);

        return orderRepository.find({
            where: {
                userId
            }
        });

    }

}

const orderService = new OrderService();
export default orderService;