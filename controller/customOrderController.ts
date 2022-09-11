import { Request, Response } from "express"
import CustomOrder from '../models/customOrderModel';

//post customOrder
export const postCustomOrder = async (req: Request, res: Response) => {
    const {
        name,
        phone,
        clothingStyle,
        extraInformation,
    } = req.body
    const customOrder = new CustomOrder({
        name,
        phone,
        clothingStyle,
        extraInformation,


    })

    try {

        const createdCustomOrder = await customOrder.save();
    } catch (error) {
        res.status(400).send(error)
    }
    res.status(201).json("new customOrder created")
}
// get all user customOrders

export const getAllCustomOrders = async (req: Request, res: Response) => {
    const customOrders = await CustomOrder.find()
    if (!customOrders) res.status(404).send({ message: "CustomOrders not Found" });
    res.status(200).json(customOrders)
}
// get all customOrder by name
export const getUserCustomOrders =async (req: Request, res: Response) => {
    const name = req.body.name
    const customOrders = await CustomOrder.find({name:name}).sort({createdAt:1})
    if(!customOrders)res.status(404).send({ message: "CustomOrders not Found" });
    res.status(200).json(customOrders)

}
// get single customOrder by customOrder Id
// export const getSingleCustomOrders = async (req:Request,res:Response) => {
//     const Id = req.params.id
//     const customOrder = await CustomOrder.find({_Id:Id}).
//     if(!customOrder){ res.status(404).send({ message: "CustomOrder not Found" })}

//     res.status(200).json(customOrder)

// } 
export const getSIngleCustomOrder = async (req:Request,res:Response) => {
    const Id = req.params.id
    const customOrder = await CustomOrder.find({_id:Id})
    if(!customOrder) res.status(404).send({message:"CustomOrder not found"})
    res.status(200).json(customOrder)
}
export const updateCustomOrder = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const customOrder = req.body
    const updatedCustomOrder = await CustomOrder.findByIdAndUpdate(_id,customOrder, { new: true });
    res.status(200).json(updatedCustomOrder);
    console.log("updated customOrder");

}


export const deleteCustomOrder = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedCustomOrder = await CustomOrder.findByIdAndRemove(_id);
      res.status(200).json(deletedCustomOrder);
      console.log("deleted PRODUCT");
    
  };