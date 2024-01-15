const mongoose = require("mongoose");
const {UserModel} = require("../models/user.models");
const {PostModel} = require("../models/post.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const {BlacklistModel} = require("../models/blacklist.models");
const { use } = require("bcrypt/promises");
const userRouter = express.Router();
// Register

userRouter.post("/register",async(req,res)=>{
    const {name, email,gender,password,age, city} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.json({msg:"Email already used !"})
    }else{ 
        try{
        bcrypt.hash(password,3,async(err,hash)=>{
          if(err){
              res.status(200).json({error:err})
          }else{
              const user = new UserModel({name, email,gender,password:hash,age, city})
              await user.save();
              res.status(400).json({msg:"New User registerd", user:user})
          }
        })
      }
      catch{
          console.log(err);
       res.json({err});
      }
  }}
)
   

// Login
userRouter.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    try{
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(password,user.password,(err, result)=>{
            if(result){
                const access_token = jwt.sign({userID: user._id, user:user.name},"Prity");
                const refresh_token = jwt.sign({userID: user._id, user:user.name},"Prity");
                res.json({msg:"Login Successful", user,access_token, refresh_token});
                
            }else{
                res.json({msg:"Wrong email and password"})
            }
        })
       }
    }catch(err){
          res.json({err})
    }
})


userRouter.get("/logout",async(req,res)=>{
    const access_token = req.headers.authorization?.split(" ")[1];
    const refresh_token = req.headers.authorization?.split(" ")[2];
    try{
    const blacklist = new BlacklistModel({access_token,refresh_token})
    await blacklist.save();
    res.status(200).json({msg:"User has been logges out"})
    }
    catch(err){
      res.json({err});
    }
})






module.exports = {
    userRouter
}