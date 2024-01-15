const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    gender:{type:String},
    password:{type:String},
    age:{type:Number},
    city:{type:String}
},{
    versionKey:false
})

const UserModel = mongoose.model('user',userSchema);

module.exports={
    UserModel
}