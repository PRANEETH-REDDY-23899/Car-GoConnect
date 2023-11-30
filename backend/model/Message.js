const mongoose=require('mongoose')
const Message= new mongoose.Schema({

    content:{
        type:String,
        trim:true,
    },
    chat:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
           
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
{
    timestamps:true
}

)
module.exports =mongoose.model("Message", Message);