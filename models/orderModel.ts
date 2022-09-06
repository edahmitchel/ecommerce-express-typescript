import mongoose from "mongoose";
import { IOrder } from "../utils/types";

const orderSchema = new mongoose.Schema(
    {
        
        // price: { type: Number, required: true },
        shippingStatus: { type: Boolean, required: true },
        price: { type: Number, required: true },
        products: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }],
        user:{ref:"User",
        type:mongoose.Schema.Types.ObjectId

        }
      },
 
)

const Order = mongoose.model<IOrder>("Orders",orderSchema)
export default Order
