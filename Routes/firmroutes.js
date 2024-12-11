const express=require("express");
const firmcontroller=require("../controllers/firmcontroller");
const verifytoken=require("../middleware/verifytoken");
const router=express.Router();

router.post('/addfirm',verifytoken,firmcontroller.addfirm);
router.get("/:id",firmcontroller.getfirmbyid);

// getting images with common format;
router.get("/upload/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSend('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
});

router.delete("/:id",firmcontroller.deletefirm)

module.exports=router;   