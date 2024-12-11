const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg",'non-veg']
            }
        ]
    },
    image:{
        type:String
    },
    bestseller:{
        type:Boolean,
    },
    description:{
        type:String
    },
    // relation
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]
})

module.exports=new mongoose.model("product",productschema);