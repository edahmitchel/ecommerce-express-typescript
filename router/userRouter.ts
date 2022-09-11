import express from 'express';
import * as userController from "../controller/userController"


const userRouter = express.Router()
userRouter.get("/",userController.getAllUsers)
userRouter.get("/:id",userController.getSIngleUser)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",userController.deleteUser)
userRouter.post("/",userController.postUser)

export default userRouter;
