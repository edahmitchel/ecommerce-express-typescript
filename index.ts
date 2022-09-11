// const express,{Req} = require('express')
import express,{ Express,Request,Response,NextFunction } from "express"
import "dotenv/config"
import mongoose from "mongoose"
import userRouter from "./router/userRouter";
import orderRouter from "./router/orderRouter";
import customOrderRouter from "./router/customOrderRouter";
import shippingRouter from "./router/shippingRouter";
import productRouter from "./router/productRouter";
import paymentRouter from "./router/paymentRouter";
const uri = process.env.MONGODB_URL as string
const port = process.env.PORT||4040


const app:Express = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(express.json());
mongoose.connect(uri)
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/customorder", customOrderRouter);
app.use("/api/shipping", shippingRouter);
app.use("/api/product", productRouter);
app.use("/api/payment", paymentRouter);
app.get("/",(req:Request,res:Response)=>{res.send("express server")})

// An error catcher
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  res.status(500).send({ message: err.message });
});
// .then().catch((err)=>console.log(err.message))
mongoose.connection.once("open", ()=>{app.listen(port,()=>console.log(`server running on ${port}`))
  })

// app.listen(port, () => {
//   console.log(`✅ Server ready at port ${port}`);
// });