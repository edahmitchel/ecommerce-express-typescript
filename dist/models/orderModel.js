"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    // price: { type: Number, required: true },
    shippingStatus: { type: Boolean, required: true },
    price: { type: Number, required: true },
    products: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }],
    user: { ref: "User",
        type: mongoose_1.default.Schema.Types.ObjectId
    }
});
const Order = mongoose_1.default.model("Orders", orderSchema);
exports.default = Order;
