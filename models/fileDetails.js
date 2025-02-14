const { required } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const fileSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true,
    },
    pdf:{
       type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    likes:{
        type:Number
    },
    userActions: {
        type: Map,
        of:String,
        default:{}  
      },

})

const files=mongoose.model('files',fileSchema);
module.exports=files