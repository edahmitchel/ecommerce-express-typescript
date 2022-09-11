import { Request, Response } from "express"
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler'
//post user
export const postUser = expressAsyncHandler( async (req: Request, res: Response) => {
    const {
        name,
        email,
        phone,
        password,
        isAdmin
    } = req.body
    const user = new User({
        name,
        email,
        phone,
        password,
        isAdmin

    })

    try {

        const createdUser = await user.save();
    } catch (error) {
        res.status(400).send(error)
    }
    res.status(201).json("new user created")
})
// get all users

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find()
    if (!users) res.status(404).send({ message: "Users not Found" });
    res.status(200).json(users)
}
// // get all user by user
// const getUserUsers =async (req: Request, res: Response) => {
//     const userId = req.params.id
//     const users = await User.find({userId:userId}).sort({createdAt:1})
//     if(!users)res.status(404).send({ message: "Users not Found" });
//     res.status(200).json(users)

// }



export const getSIngleUser = async (req:Request,res:Response) => {
    const Id = req.params.id
    const user = await User.find({_id:Id})
    if(!user) res.status(404).send({message:"User not found"})
    res.status(200).json(user)
}


export const updateUser = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const user = req.body
    const updatedUser = await User.findByIdAndUpdate(_id,user, { new: true });
    res.status(200).json(updatedUser);
    console.log("updated user");

}


export const deleteUser = async (req:Request,res:Response) => {
    const { id: _id } = req.params;
      const deletedUser = await User.findByIdAndRemove(_id);
      res.status(200).json(deletedUser);
      console.log("deleted user");
    
  };