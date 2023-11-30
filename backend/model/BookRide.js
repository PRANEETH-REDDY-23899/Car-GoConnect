const mongoose=require('mongoose');
 
const BookRide= new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    publishid:{
        type:String,
        required:true
    }
})  
module.exports =mongoose.model("BookRide", BookRide);
