"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    price: { type: Number, required: true },
    isVerified: { type: Boolean, required: true },
    orderId: { ref: "Order",
        type: mongoose_1.default.Schema.Types.ObjectId
    }
});
const Payment = mongoose_1.default.model("Payment", paymentSchema);
exports.default = Payment;
