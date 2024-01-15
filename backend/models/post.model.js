const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String},
    body:{type:String},
    device:{type:String, required:true},
    no_of_comments:{type:Number, required:true},
    userID:{type:String},
    name:{type:String}
},{
    versionKey:false
})

const PostModel = mongoose.model('post',postSchema);

module.exports={
    PostModel
}