const express = require('express');
const router = express.Router();
const multer  = require('multer')
const fileSchema=require('../models/fileDetails')
const userSchema=require('../models/user')
const {authMiddleware}=require("../middlewares/checkAuth")
const path = require('path');
const fs = require('fs');
const { error, Console } = require('console');
const user = require('../models/user');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary=require('../cloudinaryConfig')

// const upload = multer({ dest: './files' })

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',   
    resource_type: 'raw', 
  },
});

const filter=(req,file,cb)=>{
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

if (allowedTypes.includes(file.mimetype)) {
  cb(null, true);   
} else {
  cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'), false);  
}
};


const upload = multer({ storage: storage, fileFilter: filter });
  
router.post("/uploadfile",authMiddleware,upload.single("file"),async(req,res)=>{
  console.log("in upload")  
 const title=req.body.title;
 const branch=req.body.branch;
 const subject=req.body.subject;
 const description=req.body.description;
if (!req.user) {
  return res.status(401).send({ status: "error", message: "Unauthorized access" });
}  
 if (!req.file) {
  return res.status(400).send({ status: "error", message: "File not uploaded" });
}
if (!title || !branch || !subject || !description) {
  return res.status(400).send({ status: "error", message: "All fields are required" });
}
const fileUrl = req.file.path;  
console.log(fileUrl);
 try{
  if(req.user){
    console.log("saved")
    await fileSchema.create({user:req.user,title:title,pdf:fileUrl,branch:branch,subject:subject,description:description});
    res.send({status:"ok"});
 }}
 catch(err){
    res.json({status:"error",message:err.message});
 }
}) 


router.get("/getfiles",authMiddleware,async (req,res)=>{
    try{
      if (!req.user) {
        return res.status(401).send({ status: "error", message: "Unauthorized access" });
      }
        const data=await fileSchema.find({user: req.user._id});
        res.send({status:"ok",data:data});
    }
    catch(err){
            res.status(500).send({status:"error",error:err.message});
    }
})


router.get("/getfiles/:subject",async (req,res)=>{
  try{
    const { subject } = req.params;
    
      const data=await fileSchema.find({subject:subject});
    
      if(data.length>0){
        res.send({status:"ok",data:data});
      }
      else{
        res.status(404).send({ status: "error", message: "No files found for the specified subject" });
      }
  }
  catch(err){
    res.status(500).send({status:"error",error:err.message})
  }
})

router.delete("/removefiles/:fileId",authMiddleware,async (req,res)=>{
    try{
      if (!req.user) {
        return res.status(401).send({ status: "error", message: "Unauthorized access" });
    }
    
    const fileId = req.params.fileId;

    const file = await fileSchema.findOne({ _id: fileId, user: req.user._id });
    if (!file) {
      return res.status(404).send({ status: "error", message: "File not found" });
  }
  const fileUrl = file.pdf;

  const publicId = fileUrl.split('/').slice(-1)[0].split('.')[0];  // Extract public ID from Cloudinary URL

  await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
 

    await fileSchema.deleteOne({ _id: fileId });
  res.send({ status: "ok", message: "File deleted successfully" });
  }
    
    catch(err){
        console.log("error is:",err);
    }
})

router.post('/like/:id',authMiddleware,async (req,res)=>{
  try{
    const userId = req.user?.id || req.user; // Adjust based on how `authMiddleware` sets it
  if (!userId) {
  return res.status(401).json({ success: false, message: "Unauthorized access" });
}

    const fileId=req.params.id;
    const file=await fileSchema.findById(fileId);
    if(!file){
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    if (!file.userActions) {
      file.userActions = {};
    }
    const curr = file.userActions.get(userId);  
     

    if(curr==='like'){
      file.likes = Math.max(0, (file.likes || 0) - 1);
     
      file.userActions.delete(userId);
    }
    else{
      file.likes = (file.likes || 0) + 1;
     
     
      file.userActions.set(userId,'like');
      console.log("Liked successfully");
  }
  await file.save();

  res.status(200).json({ 
    success: true, 
    file, 
    message: curr === 'like' ? 'Like removed' : 'Liked successfully' 
  });
  }
  catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/favourites/:fileId',authMiddleware,async (req,res)=>{
  try{
    if (!req.user) {
      return res.status(401).send({ status: "error", message: "Unauthorized access" });
    }
    const fileId=req.params.fileId;
    const user=req.user;
    const file=await fileSchema.findById(fileId);
    if(!file){
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    if(!user.favourites.includes(fileId)){
      user.favourites.push(fileId);
      await user.save();
      return res.status(200).json({success:true,message:'File added to favourites'})
    
    }
else{
  return res.status(400).json({success:false,message:'File already in favourites'})
}
  }
  catch(er){
      res.status(500).json({success:false,message:"Internal server error"})
  }
})
 
router.get('/getfavourites',authMiddleware,async (req,res)=>{
  try{
  if (!req.user) {
    return res.status(401).send({ status: "error", message: "Unauthorized access" });
  }
  const user = await userSchema.findById(req.user._id).populate('favourites');
 
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.status(200).json({ status: "success", favourites: user.favourites });
}
catch(err){
  console.log(err);
  return res.status(500).json({ status: "error", message: "Log in to add to your favourites" });
}
});


module.exports = router; 
