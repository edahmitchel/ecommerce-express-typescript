import {Request,Response } from "express"
import Order from "../models/orderModel"

// import {expressAsyncHandler} from "express-async-handler";
export const postOrder = async(req:Request,res:Response)=>{
    const order = new Order({

    })
} 