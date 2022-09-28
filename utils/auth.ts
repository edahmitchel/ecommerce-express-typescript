import { Jwt } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { IUser } from "./types";
import process from "process";
import { NextFunction } from "express";

export const signToken = async ({isAdmin,name,email,phone}:IUser)=>{
//   create and signtoken for the new admin
  const token = await jwt.sign(
    { isAdmin,name,email },
    process.env.JWT_SECRET as string,
    { expiresIn: 360000 }
  );

  return token
//   res.status(201).json({
//     token,
//   });
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(process.env.JWT_SECRET)
    //@ts-ignore
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      //@ts-ignore
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            //@ts-ignore
          res.status(401).send({ message: "Invalid Token" });
        } else {
          //@ts-ignore
          req.user = decode;
          next();
        }
      });
    } else {
        //@ts-ignore
      res.status(401).send({ message: "No Token" });
    }
  };
  
