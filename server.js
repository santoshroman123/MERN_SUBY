const express = require("express");
const dotenv=require("dotenv");
const mongodb=require("mongoose");
const router=require("./Routes/vendorRoutes");
const firmroutes=require("./Routes/firmroutes");
const productrouter=require("./Routes/productRoutes");
const path=require("path");
const body_parser = require("body-parser");
const app=express();
dotenv.config({path:".env"});

mongodb.connect(process.env.mongo_uri)
.then(res=>{console.log("mongoDB connected successfull")})
.catch(err=>{console.log("Mongodb is not connected",err)})

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


const port=process.env.port || 4000;

// Routes
app.use("/vendor",router);
app.use('/firm',firmroutes);
app.use("/product",productrouter);
app.use('/uploads',express.static("uploads"));


app.listen(port,()=>{console.log("server Conntected",port)}); 

