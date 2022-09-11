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
exports.deletePayment = exports.updatePayment = exports.getSInglePayment = exports.getAllPayments = exports.postPayment = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
// import {expressAsyncHandler} from "express-async-handler";
const postPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, price, isVerified } = req.body;
    const payment = new paymentModel_1.default({
        orderId,
        price,
        isVerified
    });
    try {
        const createdPayment = yield payment.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new payment created");
});
exports.postPayment = postPayment;
// get all user payments
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield paymentModel_1.default.find();
    if (!payments)
        res.status(404).send({ message: "Payments not Found" });
    res.status(200).json(payments);
});
exports.getAllPayments = getAllPayments;
//get single payment 
const getSInglePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const payment = yield paymentModel_1.default.find({ _id: Id });
    if (!payment)
        res.status(404).send({ message: "Order not found" });
    res.status(200).json(payment);
});
exports.getSInglePayment = getSInglePayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const payment = req.body;
    const updatedPayment = yield paymentModel_1.default.findByIdAndUpdate(_id, payment, { new: true });
    res.status(200).json(updatedPayment);
    console.log("updated payment");
});
exports.updatePayment = updatePayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedPayment = yield paymentModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedPayment);
    console.log("deleted PRODUCT");
});
exports.deletePayment = deletePayment;
