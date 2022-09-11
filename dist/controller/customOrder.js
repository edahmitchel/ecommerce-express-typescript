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
exports.getSIngleCustomOrder = exports.getUserCustomOrders = exports.getAllCustomOrders = exports.postCustomOrder = void 0;
const customOrderModel_1 = __importDefault(require("../models/customOrderModel"));
//post customOrder
const postCustomOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, clothingStyle, extraInformation, } = req.body;
    const customOrder = new customOrderModel_1.default({
        name,
        phone,
        clothingStyle,
        extraInformation,
    });
    try {
        const createdCustomOrder = yield customOrder.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new customOrder created");
});
exports.postCustomOrder = postCustomOrder;
// get all user customOrders
const getAllCustomOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customOrders = yield customOrderModel_1.default.find();
    if (!customOrders)
        res.status(404).send({ message: "CustomOrders not Found" });
    res.status(200).json(customOrders);
});
exports.getAllCustomOrders = getAllCustomOrders;
// get all customOrder by name
const getUserCustomOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const customOrders = yield customOrderModel_1.default.find({ name: name }).sort({ createdAt: 1 });
    if (!customOrders)
        res.status(404).send({ message: "CustomOrders not Found" });
    res.status(200).json(customOrders);
});
exports.getUserCustomOrders = getUserCustomOrders;
// get single customOrder by customOrder Id
// export const getSingleCustomOrders = async (req:Request,res:Response) => {
//     const Id = req.params.id
//     const customOrder = await CustomOrder.find({_Id:Id}).
//     if(!customOrder){ res.status(404).send({ message: "CustomOrder not Found" })}
//     res.status(200).json(customOrder)
// } 
const getSIngleCustomOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const customOrder = yield customOrderModel_1.default.find({ _id: Id });
    if (!customOrder)
        res.status(404).send({ message: "CustomOrder not found" });
    res.status(200).json(customOrder);
});
exports.getSIngleCustomOrder = getSIngleCustomOrder;
