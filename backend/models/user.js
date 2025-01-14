const { required } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    favourites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'files',
    }],
});

const user=mongoose.model('user',userSchema);
module.exports=user