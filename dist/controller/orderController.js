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
exports.deleteOrder = exports.updateOrder = exports.getSIngleOrder = exports.getAllOrders = exports.postOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
//post order
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orders, userId, shippingStatus, } = req.body;
    const order = new orderModel_1.default({
        orders,
        userId,
        shippingStatus,
    });
    try {
        const createdOrder = yield order.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new order created");
});
exports.postOrder = postOrder;
// get all user orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find();
    if (!orders)
        res.status(404).send({ message: "Orders not Found" });
    res.status(200).json(orders);
});
exports.getAllOrders = getAllOrders;
// get all order by user
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const orders = yield orderModel_1.default.find({ userId: userId }).sort({ createdAt: 1 });
    if (!orders)
        res.status(404).send({ message: "Orders not Found" });
    res.status(200).json(orders);
});
// get single order by order Id
// export const getSingleOrders = async (req:Request,res:Response) => {
//     const Id = req.params.id
//     const order = await Order.find({_Id:Id}).
//     if(!order){ res.status(404).send({ message: "Order not Found" })}
//     res.status(200).json(order)
// } 
const getSIngleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const order = yield orderModel_1.default.find({ _id: Id });
    if (!order)
        res.status(404).send({ message: "Order not found" });
    res.status(200).json(order);
});
exports.getSIngleOrder = getSIngleOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const order = req.body;
    const updatedOrder = yield orderModel_1.default.findByIdAndUpdate(_id, order, { new: true });
    res.status(200).json(updatedOrder);
    console.log("updated order");
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedOrder = yield orderModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedOrder);
    console.log("deleted PRODUCT");
});
exports.deleteOrder = deleteOrder;
