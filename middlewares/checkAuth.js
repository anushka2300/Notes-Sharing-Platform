const joi=require('joi');
const jwt=require('jsonwebtoken')
const user=require('../models/user')
const signupValid=(req,res,next)=>{
    const schema =joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

const loginValid=(req,res,next)=>{
    const schema =joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error})
    }
    next();
}

const authMiddleware = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or invalid format', success: false });
        }
        const token=authHeader.split(' ')[1];
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
       
        const userInfo=await user.findById(decoded._id);
        if(!userInfo){
            return res.status(404).json({message:"user not found",success:false});
        }
       
        req.user = userInfo; 
        next();
    }
    catch(err){
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports={
    signupValid,
    loginValid,
    authMiddleware
}
