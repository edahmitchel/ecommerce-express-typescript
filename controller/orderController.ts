import { Request, Response } from "express"
import Order from '../models/orderModel';

//post order
export const postOrder = async (req: Request, res: Response) => {
    const {
        orders,
        userId,
        shippingStatus,
    } = req.body
    const order = new Order({
        orders,
        userId,
        shippingStatus,


    })

    try {

        const createdOrder = await order.save();
    } catch (error) {
        res.status(400).send(error)
    }
    res.status(201).json("new order created")
}
// get all user orders

export const getAllOrders = async (req: Request, res: Response) => {
    const orders = await Order.find()
    if (!orders) res.status(404).send({ message: "Orders not Found" });
    res.status(200).json(orders)
}
// get all order by user
const getUserOrders =async (req: Request, res: Response) => {
    const userId = req.params.id
    const orders = await Order.find({userId:userId}).sort({createdAt:1})
    if(!orders)res.status(404).send({ message: "Orders not Found" });
    res.status(200).json(orders)

}
// get single order by order Id
// export const getSingleOrders = async (req:Request,res:Response) => {
//     const Id = req.params.id
//     const order = await Order.find({_Id:Id}).
//     if(!order){ res.status(404).send({ message: "Order not Found" })}

//     res.status(200).json(order)

// } 
export const getSIngleOrder = async (req:Request,res:Response) => {
    const Id = req.params.id
    const order = await Order.find({_id:Id})
    if(!order) res.status(404).send({message:"Order not found"})
    res.status(200).json(order)
}
export const updateOrder = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const order = req.body
    const updatedOrder = await Order.findByIdAndUpdate(_id,order, { new: true });
    res.status(200).json(updatedOrder);
    console.log("updated order");

}


export const deleteOrder = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedOrder = await Order.findByIdAndRemove(_id);
      res.status(200).json(deletedOrder);
      console.log("deleted PRODUCT");
    
  };