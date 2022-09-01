// const express,{Req} = require('express')
import express,{ Express,Request,Response } from "express"
import dotenv from "dotenv"
// const dotenv = require('dotenv')
dotenv.config()
const app:Express = express()
const port = process.env.PORT||4040
app.get("",(req:Request,res:Response)=>{res.send("express server")})
app.listen(port,()=>console.log(`server running on ${port}`))