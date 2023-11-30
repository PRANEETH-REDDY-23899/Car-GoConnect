const express = require("express")
const  PublishRides = require("../model/PublishRide")
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const AddVehicle = require("../model/AddVehicle");
const Feedback = require("../model/Feedback");
const PublishRidesRoutes = express.Router()




PublishRidesRoutes.post("/publishride", async (req,res)=>{
    console.log(req.body)
    try{
        const newpublish = new PublishRides(req.body)
       newpublish.save()
        res.send("successfully added vehicle")
    }catch(err){
        res.send(err)

    }
})

PublishRidesRoutes.get("/getrides/:userid", async (req,res)=>{

    try{
        const Rides = await PublishRides.find({UserId:req.params.userid})
         
        const vehicles=[]
        
        // const Data = Rides.map(async (Ride,index)=>{
        //      const vehicle = await AddVehicle.findById(Ride.vehicleid)
        //      console.log(vehicle)
        //      vehicles.push(vehicle)
          
        // })

        for (const Ride of Rides) {
            let vehicle = await AddVehicle.findById(Ride.vehicleid)
             console.log(vehicle)
             vehicles.push(vehicle)
          }
        
        console.log({
            Rides:Rides,
            vehicles:vehicles
        })
        res.send({
            Rides:Rides,
            vehicles:vehicles
        })
    }catch(err){
        res.send(err)

    }
})


PublishRidesRoutes.get("/Allrides", async (req,res)=>{

    try{
        const Rides = await PublishRides.find({})
         
        const vehicles=[]
        
        // const Data = Rides.map(async (Ride,index)=>{
        //      const vehicle = await AddVehicle.findById(Ride.vehicleid)
        //      console.log(vehicle)
        //      vehicles.push(vehicle)
          
        // })

        for (const Ride of Rides) {
            let vehicle = await AddVehicle.findById(Ride.vehicleid)
             console.log(vehicle)
             vehicles.push(vehicle)
          }
        
        console.log({
            Rides:Rides,
            vehicles:vehicles
        })
        res.send({
            Rides:Rides,
            vehicles:vehicles
        })
    }catch(err){
        res.send(err)

    }
})

PublishRidesRoutes.post("/deleteride", async (req,res)=>{
    try{
        const delRide = await PublishRides.findByIdAndDelete(req.body.id)
        res.send("successfully deleted")
    }catch(err){
        res.send(err)
    }
})

PublishRidesRoutes.post("/verifyrides", async (req,res)=>{
    try{
        const delRide = await PublishRides.findByIdAndUpdate(req.body._id,req.body)
        res.send("successfully deleted")
    }catch(err){
        res.send(err)
    }
})

PublishRidesRoutes.post("/searchrides" , async (req,res)=>{
    try{
        const Rides = await PublishRides.find({status:"verified",From:req.body.From,To:req.body.To,Date:req.body.Date,Members:{ $gte: Number(req.body.Members)}})

        const vehicles=[]
        
        // const Data = Rides.map(async (Ride,index)=>{
        //      const vehicle = await AddVehicle.findById(Ride.vehicleid)
        //      console.log(vehicle)
        //      vehicles.push(vehicle)
          
        // })

        for (const Ride of Rides) {
            let vehicle = await AddVehicle.findById(Ride.vehicleid)
             console.log(vehicle)
             vehicles.push(vehicle)
          }
        res.send({
            Rides:Rides,
            vehicles:vehicles
        })
    }catch(err){
        res.send(err)
    }
})

PublishRidesRoutes.post("/endride" , async (req,res)=>{
    try{
        const Rides = await PublishRides.findOneAndUpdate({_id:req.body._id},{endride:true})

        console.log(Rides,"end ride")
        res.send("successfully ended ride")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

PublishRidesRoutes.post("/addfeedback", async (req,res)=>{
    try{
        const isfeedback = await Feedback.findOne({rideid:req.body.rideid})
        if(isfeedback){
            const updatefeedback = await Feedback.findOneAndUpdate({rideid:req.body.rideid},req.body)
        }else{
            const newfeedback = new Feedback(req.body)
            newfeedback.save()
        }
        
        res.send("successfully added feedback")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

PublishRidesRoutes.post("/getfeedback", async (req,res)=>{
    try{
        const feedbackArray = []
        for(var item of req.body){
            var feedback = await Feedback.findOne({rideid:item._id})
            feedbackArray.push(feedback)
        }
        
        res.send(feedbackArray)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})





module.exports=PublishRidesRoutes