import {User} from "../../entity/User.entity";
import userService from "../users/user.service";
import _ from "lodash";
import {Exception} from "../../errorHandler/exception";
import productService from "../products/product.service";
import {AppDataSource} from "../../data-source";
import {Order} from "../../entity/Order.entity";

class OrderService {
    async createOrder(orderData: {
        userId: number;
        products: {
            productId: number;
            quantity: number;
        }[];
    }) {
        const productIds = orderData.products.map(product => product.productId);
        const products = await productService.getMany(productIds);

        const ids = products.map(product => product.id);
        const arraysAreEqual = _.isEqual(_.sortBy(ids), _.sortBy(productIds));

        if (!arraysAreEqual) {
            throw new Exception(400, {message: 'Product not found'});
        }
        const orderRepository = AppDataSource.getRepository(Order);

        const dataForSave = orderData.products.map(p => {
            const product = products.find(prod => prod.id === p.productId);

            if (!product) {
                throw new Error(`Product with ID ${p.productId} not found`);
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

    async getOrder(userId: number, orderId: number): Promise<Order | null> {
        const orderRepository = AppDataSource.getRepository(Order);

        return orderRepository.findOne({
            where: {
                userId,
                id: orderId
            }
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