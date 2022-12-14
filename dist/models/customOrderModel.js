"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customOrderSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    clothingStyle: { type: String, required: true },
    extraInformation: { type: String, required: true }
});
const customOrder = mongoose_1.default.model("CustomOrder", customOrderSchema);
exports.default = customOrder;
