"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express,{Req} = require('express')
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// const dotenv = require('dotenv')
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4040;
app.get("", (req, res) => { res.send("express server"); });
app.listen(port, () => console.log(`server running on ${port}`));
