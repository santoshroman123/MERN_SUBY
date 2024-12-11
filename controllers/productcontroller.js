const productmodel=require("../models/product");
const multer=require("multer");
const Firm =require("../models/firm")
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

const addproduct=async (req,res)=>{
   try{
      const {productname,price,category,bestseller,description} = req.body;
      const image=req.file?req.file.filename:undefined;

      const firmid=req.params.id;
      const firm=await Firm.findById(firmid);
      console.log(firm)
      if(!firm){
        return res.status(401).json({Error:"No Firm Found"})
      };
      
      const product = new productmodel({productname,price,category,bestseller,description,image,firm:firm._id})
      const savedata=await product.save();

      firm.products.push(savedata);
      await firm.save();

      return res.status(200).json({savedata}); 

   }catch(err){
    console.log(err);
    return res.status(500).json({Error:"Incorrect details"})
   }
};

const getproductbyid=async(req,res)=>{
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

const deleteProduct=async(req,res)=>{
   try{
      const productId=req.params.id;
      const deleteproduct=await productmodel.findByIdAndDelete(productId);

      if(!deleteProduct){
         return res.status(404).json({Error:"No product Found"});
      }

   }catch(err){
      console.log(err);
      return res.status(500).json({Error:"invaild Details"});
   }
}

module.exports={addproduct:[upload.single('image'),addproduct],getproductbyid,deleteProduct};