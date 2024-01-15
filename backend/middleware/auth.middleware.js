const jwt = require("jsonwebtoken");
const {BlacklistModel} = require("../models/blacklist.models");

const auth = async(req,res,next)=>{
    const token1 = req.headers.authorization?.split(" ")[1];
    // const token2 = req.headers.authorization?.split(" ")[2];
    const blackToken = await BlacklistModel.findOne({access_token:token1});


    if(token1){
        if(blackToken){
            return res.json({msg:"You have been loggeg out"})
        }
        try{
        const decoded = jwt.verify(token1,"Prity")
        if(decoded){
            req.body.userID = decoded.userID
            req.body.name = decoded.name
            console.log(decoded)
            next()
        }else{
            res.json({msg:"you are not authorized"})
        }
        }catch(err)
        {
       res.json({err})
        }
    }else{
        res.json({msg:"you are not authorized"})
    }
}
module.exports={
    auth
}