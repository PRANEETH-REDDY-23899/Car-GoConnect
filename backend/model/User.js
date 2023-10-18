const mongoose=require('mongoose');
const User= new mongoose.Schema({
    p:{
        type:String,
        required:true
    },

    fn:{
        type:String,
        required:true
    },
    ln:{
        type:String,
        required:true
    },
    m:{
        type:String,
        required:true

    },
})

module.exports =mongoose.model("User", User);
