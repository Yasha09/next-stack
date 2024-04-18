import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import orderValidation from "./validation";
import orderController from "./order.controller";

const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter
    .post('/', orderValidation.createOrder, orderController.createOrder)
    .get('/', orderController.getOrders);

orderRouter.get('/:orderId', orderValidation.getOrder, orderController.getOrder);



export default orderRouter;