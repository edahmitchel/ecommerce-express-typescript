import mongoose from "mongoose";
import { ICustomOrder } from "../utils/types";

const customOrderSchema = new mongoose.Schema(
    {
        name:  { type: String, required: true },
        phone: { type: Number, required: true },
        clothingStyle: { type: String, required: true },
        extraInformation: { type: String, required: true }
    }
)

const customOrder = mongoose.model<ICustomOrder>("CustomOrder",customOrderSchema)
export default customOrder
