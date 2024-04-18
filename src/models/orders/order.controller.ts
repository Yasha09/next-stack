import {Response, NextFunction, Request} from 'express';

import {AuthRequest} from "../../common/interfaces";
import orderService from "./order.service";
import {HTTPStatus} from "../../errorHandler/types";

class OrderController {
    async createOrder(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const {products} = req.body;
            const response = await orderService.createOrder({userId: req.user.id, products});

            res.status(HTTPStatus.Created).json({
                message: 'User created successfully',
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {orderId} = req.params;
            const response: IOrderResponse | null = await orderService.getOrder(req.user.userId, Number(orderId));

            if (!response) {
                res.status(HTTPStatus.NotFound).json({
                    message: 'Order not found'
                });
                return;
            }

            res.status(HTTPStatus.OK).json({
                message: 'Order fetched successfully',
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await orderService.getOrders(req.user.userId);
            res.status(HTTPStatus.OK).json({
                message: 'Orders fetched successfully',
                data: response
            });
        } catch (error) {
            next(error);
        }

    }
}

const orderController = new OrderController();
export default orderController;