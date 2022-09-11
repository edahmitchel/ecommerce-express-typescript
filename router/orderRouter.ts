import express from 'express';
import * as orderController from "../controller/orderController"


const orderRouter = express.Router()
orderRouter.get("/",orderController.getAllOrders)
orderRouter.get("/:id",orderController.getSIngleOrder)
orderRouter.put("/:id",orderController.updateOrder)
orderRouter.delete("/:id",orderController.deleteOrder)
orderRouter.post("/",orderController.postOrder)

export default orderRouter;
