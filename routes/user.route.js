const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");


const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,pass,email}=req.body;
    try {
        bcrypt.hash(pass, 2, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.json("Password Not hash")
            }
            else if(hash){
                 const user=new userModel({name,email,pass:hash});
                 await user.save()
            }
        });
        res.json(req.body)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    

})
userRouter.post("/login",async(req,res)=>{
  const {email,pass}=req.body
  try {
    const user=await userModel.findOne({email});
    if(user){
        bcrypt.compare(pass, user.pass, (err, result)=> {
            if(err){
                res.status(400).json({err:err.message})
            }
            else{
                var token = jwt.sign({ userId: user._id, name: user.name }, 'shhhhh');
                res.json({msg:"User Successfull Login",token})
            }
        });
    }
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

module.exports=userRouter

