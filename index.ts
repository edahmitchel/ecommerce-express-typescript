// const express,{Req} = require('express')
import express,{ Express,Request,Response } from "express"
import "dotenv/config"
import mongoose from "mongoose"


const app:Express = express()
const port = process.env.PORT||4040
const uri = process.env.MONGODB_URL as string
app.get("",(req:Request,res:Response)=>{res.send("express server")})
mongoose.connect(uri).then(()=>app.listen(port,()=>console.log(`server running on ${port}`))).catch((error) => {
    console.error(error.message);
  });
mongoose.connection.once("open", ()=>{
    console.log("connected to mongodb")
  })
// console.log("hello")
