const mongoose=require('mongoose');
 

const AddVehicle= new mongoose.Schema({
    Driverlicense :{
        type:String,
        required:true
    },

    Proofofautoinsurance:{
        type:String,
        required:true
    },
    Financedocuments:{
        type:Array,
    },
    CarImages :{
        type:Array,
        required:true

    },
    Carname:{
        type:String,
        required:true
    },
    Carmodel:{
        type:String,
        required:true
    },
    licensenumberofcar:{
        type:String,
        required:true
    },
    Yearofmodel:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})  
module.exports =mongoose.model("AddVehicle", AddVehicle);
