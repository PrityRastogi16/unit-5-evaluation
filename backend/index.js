const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.routes");
const app = express()
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter);

app.listen(2003,async()=>{
    try{
        await connection
        console.log("Connected to db")
        console.log("Running on 2003")
    }
    catch(err){
        console.log(err);
    }
    
})