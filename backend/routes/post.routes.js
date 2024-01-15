// const {UserModel} = require("../models/user.models");
const {PostModel} = require("../models/post.model");
const {auth} = require("../middleware/auth.middleware");
const express = require("express");
const { userRouter } = require("./user.routes");
const postRouter = express.Router();

postRouter.use(auth);
postRouter.post("/add",async(req,res)=>{
    try{
        const post = new PostModel(req.body);
        await post.save();
        res.status(400).json({msg:"A post uploaded",post})
    }catch(err){
        res.status(200).json({err})
    }
})

// get
postRouter.get("/",async(req,res)=>{
    try{
       const posts = await PostModel.find({userID:req.body.userID})
       res.status(200).json({posts})
    }
    catch(err){
       res.json({err})
    }
})

// top
postRouter.get("/top",async(req,res)=>{
    try{
    const userID = req.user.id;
    const page = req.query.page?parseInt(req.query.page):1
    const limit = 3;
    const posts = await PostModel.find({user:userID}).sort({no_of_comments:-1}).skip((page-1)*limit).limit(limit)
    res.json(posts)
    }
    catch(err){
        res.json({err})
    }
})

// Update
postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;
    try{
      if(payload.userID === req.body.userID){
        await PostModel.findByIdAndUpdate({_id:id},payload);
        res.json({msg:"Notes updated"});
      }
    }
    catch(err){
       res.json({err})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const payload = req.body;
    try{
      if(payload.userID === req.body.userID){
        await PostModel.findByIdAndDelete({_id:id},payload);
        res.json({msg:"Notes Deleetd"});
      }
    }
    catch(err){
       res.json({err})
    }
})

module.exports={
    postRouter
}