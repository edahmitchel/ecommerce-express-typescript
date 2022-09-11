"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    collections: { type: String, required: true },
    sizes: { type: Number },
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
