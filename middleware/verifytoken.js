const Vendor=require("../models/vendor");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

dotenv.config({path:".env"});
const key=process.env.key;

const verifytoken=async (req,res,next)=>{
     const token=req.headers.token;

     if(!token){
       return res.status(401).json({Error:"Token is Required"});
     };

     try{
       const decoded=jwt.verify(token,key);
      
       const id=decoded.vendorId;
       const vendor=await Vendor.findById(id);

       if(!vendor){
        return res.status(401).json({Error:"Vendor not Found"});
       };

       req.vendorId=vendor._id;

       next();
     }catch(err){
        return res.status(500).json({Error:"Invaild Token"});
     }
};

module.exports = verifytoken