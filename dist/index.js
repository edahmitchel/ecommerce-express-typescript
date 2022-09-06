"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express,{Req} = require('express')
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4040;
const uri = process.env.MONGODB_URL;
app.get("", (req, res) => { res.send("express server"); });
mongoose_1.default.connect(uri).then(() => app.listen(port, () => console.log(`server running on ${port}`))).catch((error) => {
    console.error(error.message);
});
mongoose_1.default.connection.once("open", () => {
    console.log("connected to mongodb");
});
// console.log("hello")
