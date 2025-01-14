const router=require('express').Router();
const {signupValid} =require("../middlewares/checkAuth")
const {loginValid}=require("../middlewares/checkAuth")
const {authMiddleware} =require('../middlewares/checkAuth')
const user=require('../models/user')
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken')
router.post('/signup',signupValid,async (req,res)=>{
     try{
        const{name,email,password}=req.body;
        const exist=await user.findOne({email});
        if(exist){
            return res.status(409).json({
                message:'User already has an account',success:false
            });
        }
        const newData=new user({name,email,password});
        newData.password=await bcrypt.hash(password,10);
        await newData.save();
        res.status(201).json({message:"signup successfully",success:true})
     }
     catch(err){
        
            res.status(500).json({
                message:"Internal server error",
                success:false
            })
     }
})

router.post('/login',loginValid,async (req,res)=>{
    try{
        const{email,password}=req.body;
        const exist=await user.findOne({email});
        if(!exist){
            return res.status(409).json({
                message:'Incorrect credentials',success:false
            });
        }
         const isPass=await bcrypt.compare(password,exist.password);
         if(!isPass){
            return res.status(409).json({
                message:'Incorrect credentials',success:false
            });
         }
         const jwtToken=jwt.sign({
            email:exist.email,_id:exist._id
         },
            process.env.JWT_SECRET,
            {
                expiresIn:'24h'
            }
        )
        res.status(201).json({message:"login successfully",success:true,
            jwtToken,
            email,
            name:exist.name
        })
     }
     catch(err){
        console.log("login error")
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
     }
})

router.get('/getuser',authMiddleware,async (req,res)=>{
    try{
    if (!req.user) {
        return res.status(401).send({ status: "error", message: "Unauthorized access" });
      }
      res.status(200).json({
        status: "ok",
        success: true,
        user: {
            name: req.user.name,
            email: req.user.email,
            id: req.user._id
        }
    });
    }
    catch(err){
        console.log(err);
    }
})


module.exports=router;

