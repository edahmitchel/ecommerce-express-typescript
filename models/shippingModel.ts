import mongoose from "mongoose";
import { IShipping } from "../utils/types";

const shippingSchema = new mongoose.Schema({
    address: { type: String, required: true,},
    orderId:{ref:"Order",
    type:mongoose.Schema.Types.ObjectId

    }
   


})
const Shipping = mongoose.model<IShipping>("Shipping",shippingSchema)
export default Shipping
