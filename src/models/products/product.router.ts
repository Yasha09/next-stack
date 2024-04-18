import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import productController from "./product.controller";
import productValidator from "./validation";

const productRouter = Router();

productRouter.use(authMiddleware);

productRouter
    .post('/', productValidator.create, productController.createOne)
    .get('/', productValidator.getAll, productController.getAll)
    .patch('/', productValidator.update, productController.updateOne);

productRouter
    .get('/:id', productValidator.getOne, productController.getOne)
    .delete('/:id', productValidator.getOne, productController.deleteOne);

export default productRouter;