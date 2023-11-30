const express = require("express")
const  AddVehicle = require("../model/AddVehicle")
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const VehicleRoutes = express.Router()
const path = require('path');
const jwt = require("jsonwebtoken");
const multiparty = require('multiparty');
const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
  const params = {
    Body: buffer,
    Bucket: 'media-cargoconnect',
    ContentType: 'image/' + type,
    Key: `${name}.${type}`,
  };
  return s3.upload(params).promise();
};
VehicleRoutes.post("/uploadimage", async (request, response) => {
  console.log("body",request.body)
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    console.log(files)
    if (error) {
      return response.status(500).send(error);
    };
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const originalFilename = files.file[0].originalFilename
      const type = originalFilename.split(".").pop()

      const fileName = `${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
    
      return response.status(200).send(data);
    } catch (err) {
      console.log(err)
      return response.status(500).send(err);
    }
  });

})

VehicleRoutes.post("/newvehicle", async (req,res)=>{
    try{
        const Newvehicle = new AddVehicle(req.body)
        Newvehicle.save()
        res.send("successfully added vehicle")
    }catch(err){
        res.send(err)

    }
})

VehicleRoutes.get("/verifiedVehicles/:userid", async (req,res)=>{
    try{
        const VV = await AddVehicle.find({userId:req.params.userid,status:"verified"})
        res.send(VV)
    }catch(err){
        res.send(err)

    }
})

VehicleRoutes.get("/Vehicles/:userid", async (req,res)=>{
    try{
        const VV = await AddVehicle.find({userId:req.params.userid})
        
        res.send(VV)
    }catch(err){
        res.send(err)

    }
}) 

VehicleRoutes.post("/updatevehicle", async (req,res) =>{
    try{
        console.log(req.body)
        const id=req.body._id

        const VV = await AddVehicle.findByIdAndUpdate(req.body._id,req.body)
        res.send("updated success")
    }catch(err){
        res.send(err)

    }
} )


VehicleRoutes.get("/vehicle/:vehicleid", async (req,res) =>{
    try{
        const VV = await AddVehicle.findById(req.params.vehicleid)
        res.send(VV)
    }catch(err){
        res.send(err)

    }
} )
VehicleRoutes.get("/allvehicles", async (req,res)=>{
    try{
        const VV = await AddVehicle.find({})
        res.send(VV)
    }catch(err){
        res.send(err)

    }
} )





module.exports=VehicleRoutes