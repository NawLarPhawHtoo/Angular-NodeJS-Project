import { NextFunction, Request,Response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import crypto from "crypto";
import  jwt from "jsonwebtoken";
import User from "../models/User";

export const loginService=async(req: Request, res: Response,next: NextFunction)=>{
  User.findOne({ email:req.body.email}).then(async(user:any)=>{
    if(!user){
 return res.status(401).send({
      success:false,
      message:"Could not find user"
  });
 }
 if(!compareSync(req.body.password,user.password)){
  return res.status(401).send({
    success:false,
    message:"Incorrect password"
  });
 }

 const payload={
  email:await bcrypt.hash(user.email,12),
  id:await bcrypt.hash(user.id,12)
 }
 const token=jwt.sign(payload,'secret',{ expiresIn:'1d'});

 return res.status(200).json({
  success:true,
  token:token,
  user:user,
  message:"Login Successfully!"
 });
 })
}

export const logoutService=async(req:any, res:Response) => {
  req.session=null;
  return res.status(200).json({
    success:true,
    message:"Logout Successfully!"
  });
}
