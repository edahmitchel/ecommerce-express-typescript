"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, reqired: true },
    email: { type: String, reqired: true, unique: true },
    password: { type: String, reqired: true },
    phone: { type: Number, reqired: true, unique: true },
    isAdmin: { type: Boolean, defaule: false, reqired: true }
}, {
    timestamps: true
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
