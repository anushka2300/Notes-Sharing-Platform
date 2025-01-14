const express = require('express');
const router = express.Router();
const multer  = require('multer')
const fileSchema=require('../models/fileDetails')
const userSchema=require('../models/user')
const {authMiddleware}=require("../middlewares/checkAuth")
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const user = require('../models/user');

// const upload = multer({ dest: './files' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname )
    }
  })

const upload = multer({ storage: storage })
  

router.post("/uploadfile",authMiddleware,upload.single("file"),async(req,res)=>{
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
  const fileName = req.file.filename;
     try{
      if(req.user){
        await fileSchema.create({user:req.user,title:title,pdf:fileName,branch:branch,subject:subject,description:description});
        res.send({status:"ok"});
     }}
     catch(err){
        res.json({status:err});
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
    console.log(req.user);
    const fileId = req.params.fileId;
    console.log(fileId);

    const file = await fileSchema.findOne({ _id: fileId, user: req.user._id });
    if (!file) {
      return res.status(404).send({ status: "error", message: "File not found" });
  }

  const filePath = path.join(__dirname, '..', 'files', file.pdf)
  fs.unlink(filePath,async(err)=>{
    if (err) {
      console.error("Error deleting file from filesystem:", err);
      return res.status(500).send({ status: "error", message: "Failed to delete file from filesystem" });
    }

    await fileSchema.deleteOne({ _id: fileId });

  res.send({ status: "ok", message: "File deleted successfully" });
  })
    
    }
    catch(err){
        console.log(err);
    }
})

router.post('/like/:id',async (req,res)=>{
  try{
    const fileId=req.params.id;
    const userId = String(req.body.userId);
    const file=await fileSchema.findById(fileId);
    if(!file){
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    if (!file.userActions) {
      file.userActions = new Map();
    }
    const curr = file.userActions.get(userId);

    if(curr==='like'){
      file.likes-=1;
      file.userActions.delete(userId);
    }
    else{
      file.likes = (file.likes || 0) + 1;
      file.userActions.set(userId,'like');
  }
  await file.save();

        res.status(200).json({ success: true, file });
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
  console.log(user);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.status(200).json({ status: "success", favourites: user.favourites });
}
catch(err){
  console.log(err);
}
});


module.exports = router; 
