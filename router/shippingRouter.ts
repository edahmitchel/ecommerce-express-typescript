import express from 'express';
import * as shippingController from "../controller/shippingController"


const shippingRouter = express.Router()
shippingRouter.get("/",shippingController.getAllShippings)
shippingRouter.get("/:id",shippingController.getSIngleShipping)
shippingRouter.put("/:id",shippingController.updateShipping)
shippingRouter.delete("/:id",shippingController.deleteShipping)
shippingRouter.post("/",shippingController.postShipping)

export default shippingRouter;
