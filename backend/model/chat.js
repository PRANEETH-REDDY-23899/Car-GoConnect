const mongoose=require('mongoose')
const Chat= new mongoose.Schema({

    chatname:{
        type:String,
        trim:true,
      
    },
    groupchat:{
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    latestmessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
           
    },
    groupadmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
{
    timestamps:true
}

)
module.exports =mongoose.model("Chat", Chat);