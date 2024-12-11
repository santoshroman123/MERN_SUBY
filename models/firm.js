const mongoose=require("mongoose");

const Firm=new mongoose.Schema({
   firmname:{
        type:String,
        required:true,
        unique:true
   },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["Veg","Non Veg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["South-Indain","North-INdaian","Chinese","Bakery"]
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    // relations 
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
   
});

module.exports=mongoose.model("Firm",Firm);
