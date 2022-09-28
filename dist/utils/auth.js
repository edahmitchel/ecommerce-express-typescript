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
exports.isAuth = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
const signToken = ({ isAdmin, name, email, phone }) => __awaiter(void 0, void 0, void 0, function* () {
    //   create and signtoken for the new admin
    const token = yield jsonwebtoken_1.default.sign({ isAdmin, name, email }, process_1.default.env.JWT_SECRET, { expiresIn: 360000 });
    return token;
    //   res.status(201).json({
    //     token,
    //   });
});
exports.signToken = signToken;
const isAuth = (req, res, next) => {
    console.log(process_1.default.env.JWT_SECRET);
    //@ts-ignore
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        //@ts-ignore
        jsonwebtoken_1.default.verify(token, process_1.default.env.JWT_SECRET, (err, decode) => {
            if (err) {
                //@ts-ignore
                res.status(401).send({ message: "Invalid Token" });
            }
            else {
                //@ts-ignore
                req.user = decode;
                next();
            }
        });
    }
    else {
        //@ts-ignore
        res.status(401).send({ message: "No Token" });
    }
};
exports.isAuth = isAuth;
