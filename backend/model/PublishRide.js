const mongoose=require('mongoose');
 
const PublishRides= new mongoose.Schema({
    vehicleid:{
        type:String,
        required:true
    },
    From:{
        type:String,
        required:true
    },
    To:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Members:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    endride:{
        type:Boolean,
        default:false
    }
})  
module.exports =mongoose.model("PublishRides", PublishRides);
