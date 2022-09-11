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
exports.deleteUser = exports.updateUser = exports.getSIngleUser = exports.getAllUsers = exports.postUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//post user
exports.postUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password, isAdmin } = req.body;
    const user = new userModel_1.default({
        name,
        email,
        phone,
        password,
        isAdmin
    });
    try {
        const createdUser = yield user.save();
    }
    catch (error) {
        res.status(400).send(error);
    }
    res.status(201).json("new user created");
}));
// get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find();
    if (!users)
        res.status(404).send({ message: "Users not Found" });
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
// // get all user by user
// const getUserUsers =async (req: Request, res: Response) => {
//     const userId = req.params.id
//     const users = await User.find({userId:userId}).sort({createdAt:1})
//     if(!users)res.status(404).send({ message: "Users not Found" });
//     res.status(200).json(users)
// }
const getSIngleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const user = yield userModel_1.default.find({ _id: Id });
    if (!user)
        res.status(404).send({ message: "User not found" });
    res.status(200).json(user);
});
exports.getSIngleUser = getSIngleUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const user = req.body;
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(_id, user, { new: true });
    res.status(200).json(updatedUser);
    console.log("updated user");
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedUser = yield userModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedUser);
    console.log("deleted user");
});
exports.deleteUser = deleteUser;
