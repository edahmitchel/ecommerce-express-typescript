import mongoose from "mongoose";
import { IProduct } from "../utils/types";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    collection: { type: String, required: true },
    sizes: { type: Number },


})
const Product = mongoose.model<IProduct>("Product",productSchema)
export default Product
