import express from 'express';
import * as customOrderController from "../controller/customOrderController"


const customOrderRouter = express.Router()
customOrderRouter.get("/",customOrderController.getAllCustomOrders)
customOrderRouter.get("/:id",customOrderController.getSIngleCustomOrder)
customOrderRouter.put("/:id",customOrderController.updateCustomOrder)
customOrderRouter.delete("/:id",customOrderController.deleteCustomOrder)
customOrderRouter.post("/",customOrderController.postCustomOrder)

export default customOrderRouter;
