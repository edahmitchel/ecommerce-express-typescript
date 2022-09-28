"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signIn = exports.NewUser = exports.deleteUser = exports.updateUser = exports.getSIngleUser = exports.getAllUsers = exports.postUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt = __importStar(require("bcrypt"));
const auth_1 = require("../utils/auth");
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
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const deletedUser = yield userModel_1.default.findByIdAndRemove(_id);
    res.status(200).json(deletedUser);
    console.log("deleted user");
}));
//  signup & create new admin
const NewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    let { name, email, phone, password, isAdmin } = req.body;
    const testUSER = name;
    const foundName = yield userModel_1.default.findOne({ name: testUSER }).exec();
    if (foundName) {
        console.log(foundName, "name");
        return res.status(400).json({ error: "invalid credentials" });
    }
    // res.send({data:"hello"})
    const foundUsermail = yield userModel_1.default.findOne({ email: email }).exec();
    if (foundUsermail) {
        console.log(foundUsermail, "email");
        return res.status(400).json({ error: "invalid credentials" });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    // res.send({data:"hello",hashedPassword})
    password = hashedPassword;
    const user = new userModel_1.default({
        name,
        email,
        phone,
        password,
        isAdmin
    });
    try {
        const createdUser = yield user.save();
        const token = yield (0, auth_1.signToken)(user);
        console.log(token);
        res.status(200).json({
            token,
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
    // res.status(201).json("new user created")
    //   const newUser = new User({
    //     name,
    //     email,
    //     password: hashedPassword,
    //     phone
    //   });
    //  const user =  await newUser.save();
    //   // create and signtoken for the new admin
    // const token = await jwt.sign(
    //   { email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: 360000 }
    // );
    // res.status(201).json({
    //   token,
    // });
});
exports.NewUser = NewUser;
exports.signIn = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    const testUSER = name;
    // res.send({data:"hello"})
    const foundUsermail = yield userModel_1.default.findOne({ email: email }).exec();
    if (!foundUsermail) {
        console.log(foundUsermail, "email");
        return res.status(400).json({ error: "user does not exist" });
    }
    const auth = yield bcrypt.compare(password, foundUsermail.password);
    console.log(auth);
    if (!auth)
        res.status(400).json({ error: "invalid credentials" });
    let token = yield (0, auth_1.signToken)(foundUsermail);
    res.status(200).json({ token });
}));
