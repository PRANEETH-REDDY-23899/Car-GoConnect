const express = require("express")
const BookRide = require("../model/BookRide")
const PublishRide = require("../model/PublishRide")
const AddVehicle = require("../model/AddVehicle")

const BookRideRoutes = express.Router()

BookRideRoutes.post("/BookRide", async (req, res) => {
    try {
        const check = await BookRide.find({
            userid: req.body.userid,
            publishid: req.body.publishid
        })
        console.log("check",check)
        if(check.length) {
            res.send({
                value: true
            })
        } else {
            const newRide = new BookRide(req.body)
            await newRide.save()
            res.send({
                value: false,
            })
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

BookRideRoutes.get("/YourRides/:userid", async (req,res) =>{
    console.log(req.params.userid)
      try{
        const BookedRides = await BookRide.find({userid:req.params.userid})
        
        const Rides=[]
        const vehicles=[]
        for(const Ride of BookedRides){
            console.log(Ride.publishid)
            const PRide = await PublishRide.findById(Ride.publishid)
            console.log(PRide)
            Rides.push(PRide)
            let vehicle = await AddVehicle.findById(PRide.vehicleid)
            vehicles.push(vehicle)

        }
        res.send({
            Rides:Rides,
            vehicles:vehicles
        })
        
      }catch(err){
            console.log(err)
            res.send(err)
      }
})




module.exports = BookRideRoutes