import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import orderValidation from "./validation";
import orderController from "./order.controller";

const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.post('/', orderValidation.createOrder, orderController.createOrder);

orderRouter.get('/:orderId', orderValidation.getOrder, orderController.getOrder);

orderRouter.get('/', orderController.getOrders);




export default orderRouter;