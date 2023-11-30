const mongoose=require('mongoose');
 

const Admin= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    p:{
        type:String,
        required:true
    },
})
module.exports =mongoose.model("Admin", Admin);
