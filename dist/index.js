"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express,{Req} = require('express')
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const customOrderRouter_1 = __importDefault(require("./router/customOrderRouter"));
const shippingRouter_1 = __importDefault(require("./router/shippingRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const paymentRouter_1 = __importDefault(require("./router/paymentRouter"));
const uri = process.env.MONGODB_URL;
const port = process.env.PORT || 4040;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// app.use(express.json());
mongoose_1.default.connect(uri);
app.use("/api/users", userRouter_1.default);
app.use("/api/order", orderRouter_1.default);
app.use("/api/customorder", customOrderRouter_1.default);
app.use("/api/shipping", shippingRouter_1.default);
app.use("/api/product", productRouter_1.default);
app.use("/api/payment", paymentRouter_1.default);
app.get("/", (req, res) => { res.send("express server"); });
// An error catcher
app.use((err, _, res, __) => {
    res.status(500).send({ message: err.message });
});
// .then().catch((err)=>console.log(err.message))
mongoose_1.default.connection.once("open", () => {
    app.listen(port, () => console.log(`server running on ${port}`));
});
// app.listen(port, () => {
//   console.log(`✅ Server ready at port ${port}`);
// });
