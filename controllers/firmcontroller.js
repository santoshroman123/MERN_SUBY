const verifytoken=require("../middleware/verifytoken");
const Firm=require("../models/firm");
const Vendor=require("../models/vendor");
const multer=require("multer");

// multer image uploader
const storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'uploads/');
    },
    filename:function(req,file,cd){
       cd(null,Date.now() + path.extname(file.originalname));
    }
   });
   const upload=multer({storage:storage});


const addfirm=async (req,res)=>{
   try{
    const {firmname,area,category,region,offer} = req.body;
     
     const image=req.file?req.filename:undefined
     
     const vendor=await Vendor.findById(req.vendorId);
     
    if(!vendor){
       return res.status(401).json({message:"Vendor not found"})
    };

    const sendfirm = new Firm({
       firmname,area,category,region,offer,image,vendor:vendor._id
    });

    const data=await sendfirm.save();
    console.log(data)
    vendor.firm.push(data);
    await vendor.save();

   return res.status(200).json({message:"Firm added successfully"});

   }catch(err){
     console.log(err);
     return res.status(500).json({Error:"invaild Vendor"})
   }
};


const getfirmbyid=async(req,res)=>{
   try{
      const findid=req.params.id;
      const firm=await Firm.findById(findid);

      if(!firm){
         return res.status(404).json({Error:"Invaild ID"});
      };
      const resturantname = firm.firmname;
      const products=await productmodel.find({firm:findid});
      res.status(200).json({resturantname,products});

   }catch(err){
      console.log(err);
      return res.status(500).json({Error:"Invaild details"});
   }
};

const deletefirm=async(req,res)=>{
   try{
      const firmId=req.params.id;
      const deletefirm=await Firm.findByIdAndDelete(firmId);

      if(!deletefirm){
         return res.status(404).json({Error:"No Firm Found"});
      }

   }catch(err){
      console.log(err);
      return res.status(500).json({Error:"invaild Details"});
   }
}

module.exports={addfirm:[upload.single('image')],addfirm,deletefirm,getfirmbyid};
