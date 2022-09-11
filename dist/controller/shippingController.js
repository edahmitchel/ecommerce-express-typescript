"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShipping = exports.updateShipping = exports.getSIngleShipping = exports.getAllShippings = exports.postShipping = void 0;
const shippingModel_1 = __importDefault(require("../models/shippingModel"));
// import {expressAsyncHandler} from "express-async-handler";
const postShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, orderId } = req.body;
    const shipping = new shippingModel_1.default({
        address, orderId
    });
    try {
        const createdShipping = yield shipping.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new shipping created");
});
exports.postShipping = postShipping;
// get all user shippings
const getAllShippings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippings = yield shippingModel_1.default.find();
    if (!shippings)
        res.status(404).send({ message: "Shippings not Found" });
    res.status(200).json(shippings);
});
exports.getAllShippings = getAllShippings;
const getSIngleShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const shipping = yield shippingModel_1.default.find({ _id: Id });
    if (!shipping)
        res.status(404).send({ message: "Shipping not found" });
    res.status(200).json(shipping);
});
exports.getSIngleShipping = getSIngleShipping;
const updateShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const shipping = req.body;
    const updatedShipping = yield shippingModel_1.default.findByIdAndUpdate(_id, shipping, { new: true });
    res.status(200).json(updatedShipping);
    console.log("updated shipping");
});
exports.updateShipping = updateShipping;
const deleteShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedShipping = yield shippingModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedShipping);
    console.log("deleted PRODUCT");
});
exports.deleteShipping = deleteShipping;
