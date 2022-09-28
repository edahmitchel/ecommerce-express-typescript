import { Request, Response } from "express"
import User from '../models/userModel';
import expressAsyncHandler from 'express-async-handler'
import * as bcrypt from 'bcrypt';
import { sign } from "crypto";
import { signToken } from "../utils/auth";

//post user
export const postUser = expressAsyncHandler(async (req: Request, res: Response) => {
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



export const getSIngleUser = async (req: Request, res: Response) => {
  const Id = req.params.id
  const user = await User.find({ _id: Id })
  if (!user) res.status(404).send({ message: "User not found" })
  res.status(200).json(user)
}


export const updateUser = async (req: Request, res: Response) => {
  const { id: _id } = req.params
  const user = req.body
  const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
  res.status(200).json(updatedUser);
  console.log("updated user");

}


export const deleteUser =

  expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { id: _id } = req.params;
      const deletedUser = await User.findByIdAndRemove(_id);
      res.status(200).json(deletedUser);
      console.log("deleted user");

    });



//  signup & create new admin
export const NewUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  let { name,
    email,
    phone,
    password,
    isAdmin
  } = req.body;
  const testUSER = name

  const foundName = await User.findOne({name:testUSER}).exec();
  if (foundName) {
    console.log(foundName,"name");
    return res.status(400).json({ error: "invalid credentials" });
  }

  // res.send({data:"hello"})
  const foundUsermail = await User.findOne({ email: email }).exec();
  if (foundUsermail) {
    console.log(foundUsermail,"email");
    return res.status(400).json({ error: "invalid credentials" });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  // res.send({data:"hello",hashedPassword})
  password = hashedPassword
  const user = new User({
    name,
    email,
    phone,
    password,
    isAdmin

  })
  
  try {
    const createdUser = await user.save();
    const token = await signToken(user)
    console.log(token)
     res.status(200).json({
         token,
       })
    
  } catch (error) {
    res.status(400).send(error)
  }
  // res.status(201).json("new user created")
  

  //   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     phone
//   });
//  const user =  await newUser.save();
//   // create and signtoken for the new admin
  // const token = await jwt.sign(
  //   { email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: 360000 }
  // );

  // res.status(201).json({
  //   token,
  // });

}

export const signIn = expressAsyncHandler( async (req:Request,res:Response):Promise<any>=> {

  let { name,
    email,
    password
   
  } = req.body;
  const testUSER = name


  // res.send({data:"hello"})
  const foundUsermail = await User.findOne({ email: email }).exec();
  if (!foundUsermail) {
    console.log(foundUsermail,"email");
    return res.status(400).json({ error: "user does not exist" });
  }
  const auth = await bcrypt.compare(password ,foundUsermail.password)
  console.log(auth)
  if(!auth) res.status(400).json({error:"invalid credentials"})
  
 let token = await signToken(foundUsermail)
 res.status(200).json({token})

  
})



