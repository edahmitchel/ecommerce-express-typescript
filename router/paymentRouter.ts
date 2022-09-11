import express from 'express';
import * as paymentController from "../controller/paymentController"


const paymentRouter = express.Router()
paymentRouter.get("/",paymentController.getAllPayments)
paymentRouter.get("/:id",paymentController.getSInglePayment)
paymentRouter.put("/:id",paymentController.updatePayment)
paymentRouter.delete("/:id",paymentController.deletePayment)
paymentRouter.post("/",paymentController.postPayment)

export default paymentRouter;
