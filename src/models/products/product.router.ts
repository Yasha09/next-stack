import {Router} from "express";
import {authMiddleware} from "../../middlewares/auth.middleware";
import productController from "./product.controller";
import productValidator from "./validation";

const productRouter = Router();

productRouter.use(authMiddleware);

productRouter.post('/', productValidator.create, productController.createOne);

productRouter.get('/', productValidator.getAll, productController.getAll);

productRouter.get('/:id', productValidator.getOne, productController.getOne);

productRouter.patch('/', productValidator.update, productController.updateOne);

productRouter.delete('/:id', productValidator.getOne, productController.deleteOne);

export default productRouter;