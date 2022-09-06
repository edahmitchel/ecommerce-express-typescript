import mongoose from "mongoose";
import { IPayment } from "../utils/types";

const paymentSchema = new mongoose.Schema({
    price: { type: Number, required: true},
    isVerified: { type:Boolean, required: true},
    orderId:{ref:"Order",
    type:mongoose.Schema.Types.ObjectId

    }
   


})
const Payment = mongoose.model<IPayment>("Payment",paymentSchema)
export default Payment
