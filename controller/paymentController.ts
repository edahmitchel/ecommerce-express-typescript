import {Request,Response } from "express"
import Payment from '../models/paymentModel';

// import {expressAsyncHandler} from "express-async-handler";
export const postPayment = async(req:Request,res:Response)=>{
    const {
        orderId,
        price,
        isVerified
    } = req.body
    const payment = new Payment({
        orderId,
        price,
        isVerified
 

    })

try {
    
    const createdPayment =await payment.save();
} catch (error) {
res.status(400).send(error)    
}    
 res.status(201).json("new payment created")
} 
// get all user payments

export const getAllPayments = async(req:Request,res:Response)=>{
 const payments = await Payment.find()
if(!payments)res.status(404).send({ message: "Payments not Found" });
res.status(200).json(payments)
}
//get single payment 
export const getSInglePayment = async (req:Request,res:Response) => {
    const Id = req.params.id
    const payment = await Payment.find({_id:Id})
    if(!payment) res.status(404).send({message:"Order not found"})
    res.status(200).json(payment)
}
export const updatePayment = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const payment = req.body
    const updatedPayment = await Payment.findByIdAndUpdate(_id,payment, { new: true });
    res.status(200).json(updatedPayment);
    console.log("updated payment");

}


export const deletePayment = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedPayment = await Payment.findByIdAndRemove(_id);
      res.status(200).json(deletedPayment);
      console.log("deleted PRODUCT");
    
  };