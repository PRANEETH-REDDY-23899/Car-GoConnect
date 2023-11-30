const mongoose=require('mongoose')
const Notifications= new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    viewed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}

)
module.exports =mongoose.model("Notifications", Notifications);