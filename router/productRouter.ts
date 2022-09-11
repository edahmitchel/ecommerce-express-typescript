import express from 'express';
import * as productController from "../controller/productController"


const productRouter = express.Router()
productRouter.get("/",productController.getAllProducts)
productRouter.get("/:id",productController.getSIngleProduct)
productRouter.put("/:id",productController.updateProduct)
productRouter.delete("/:id",productController.deleteProduct)
productRouter.post("/",productController.postProduct)

export default productRouter;
