const express=require("express");
const router=express.Router();
const productcontroller=require("../controllers/productcontroller");

router.post("/product/:id",productcontroller.addproduct);
router.get("/product/:id",productcontroller.getproductbyid);

router.get("/upload/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSend('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
});
 
router.delete("/:id",productcontroller.deleteProduct);

module.exports=router;