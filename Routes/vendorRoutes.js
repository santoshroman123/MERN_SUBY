const vendorcontroller=require("../controllers/vendorController");
const express=require("express");
const router=express.Router();

router.post("/register",vendorcontroller.venderRegister);
router.post("/login",vendorcontroller.vendorLogin);
router.get('/getvenders',vendorcontroller.getAllvendor);
router.get('/getvenderid/:id',vendorcontroller.getvenderbyid);

module.exports=router;