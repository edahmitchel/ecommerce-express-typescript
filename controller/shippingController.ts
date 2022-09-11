import {Request,Response } from "express"
import Shipping from '../models/shippingModel';

// import {expressAsyncHandler} from "express-async-handler";
export const postShipping = async(req:Request,res:Response)=>{
    const {
        address,orderId
    
    } = req.body
    const shipping = new Shipping({
        address,orderId


    })

try {
    
    const createdShipping =await shipping.save();
} catch (error) {
res.status(400).send(error)    
}    
 res.status(201).json("new shipping created")
} 
// get all user shippings

export const getAllShippings = async(req:Request,res:Response)=>{
 const shippings = await Shipping.find()
if(!shippings)res.status(404).send({ message: "Shippings not Found" });
res.status(200).json(shippings)
}

export const getSIngleShipping = async (req:Request,res:Response) => {
    const Id = req.params.id
    const shipping = await Shipping.find({_id:Id})
    if(!shipping) res.status(404).send({message:"Shipping not found"})
    res.status(200).json(shipping)
}
export const updateShipping = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const shipping = req.body
    const updatedShipping = await Shipping.findByIdAndUpdate(_id,shipping, { new: true });
    res.status(200).json(updatedShipping);
    console.log("updated shipping");

}


export const deleteShipping = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedShipping = await Shipping.findByIdAndRemove(_id);
      res.status(200).json(deletedShipping);
      console.log("deleted PRODUCT");
    
  };