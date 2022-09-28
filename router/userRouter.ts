import express from 'express';
import * as userController from "../controller/userController"
import { isAuth } from '../utils/auth';


const userRouter = express.Router()
//@ts-ignore
userRouter.get("/",isAuth,userController.getAllUsers)
userRouter.get("/:id",userController.getSIngleUser)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)
userRouter.post("/",userController.NewUser)
userRouter.post("/signin",userController.signIn)

export default userRouter;
