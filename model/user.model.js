const { response } = require("express");
const mongoose = require("mongoose");
const bcrypt= require("bcryptjs")
 let userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    Password:String,
})
let salRound = 10;
userSchema.pre('save', function(next) {
    bcrypt
    .hash(this.Password, salRound)
    .then((hash)=>{
        this.Password= hash;
        console.log(hash);
        next();
    })
    .catch((err)=>console.log(err))
})
userSchema.methods.comparedPassword=function(userPassword,callBack){
    bcrypt.compare(userPassword,this.Password,(err,isMatch)=>{
        if(err){
            return callBack(err)
        }
        else{
            if(!isMatch){
                return callBack(null,isMatch)
            }
            else{
                return callBack(null,this)
            }
        }
    })
}

let userModel= mongoose.model("user_tb",userSchema);

module.exports = userModel