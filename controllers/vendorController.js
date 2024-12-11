const vendermodel=require("../models/vendor");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

dotenv.config({path:".env"});
const key=process.env.key;

// vendor Register verfication
const venderRegister= async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const vendoremail=await vendermodel.findOne({email});
        if(vendoremail){
           return res.status(400).json("Email already taken")
        }
        const hashpassword=await bcrypt.hash(password,10);
        const newVendor=new vendermodel({
            username,
            email,
            password:hashpassword
        });
        await newVendor.save();
        res.status(200).json({message:"vendor Register Successfully"});
        console.log("Registered")
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

// Vendor Login Verification
const vendorLogin=async (req,res)=>{
    const {email,password}=req.body;
    try{
        
        const venderemail=await vendermodel.findOne({email});

        if(!venderemail || !(await bcrypt.compare(password,venderemail.password))){
            return res.status(401).json({message:"Inavaild Username or Password"})
        };

        const token=jwt.sign({vendorId:venderemail._id},key,{expiresIn:"1h"});
        res.status(200).json({message:"Login Successfully",token});
    
    }catch(err){
       return res.status(500).json({Error:"Internet Server Failure"});
    }
};

const getAllvendor=async (req,res)=>{
    try{
        const venders=await vendermodel.find().populate({path:"firm", strictPopulate:false})
        res.status(200).json({venders})
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error:"Invaild information"})
    }
};

const getvenderbyid=async (req,res)=>{
    const venderId=req.params.id;
    try{
         const vender=await vendermodel.findById(venderId).populate('firm');

         if(!vender){
            return res.status(403).json({Error:"Invaild Id"});
         }
          res.status(200).json({vender});

    }catch(err){
         console.log(err);
         return res.status(500).json({Error:"Invaild details"})
    }
}





module.exports={venderRegister,vendorLogin,getAllvendor,getvenderbyid}