const express = require("express");
const chat = require("../model/chat");
const User = require("../model/User");
const Message = require("../model/Message");
const Notifications = require("../model/Notifications");

const Messagerouter=express.Router();


Messagerouter.post("/sendmessage", async (req,res)=>{
    try{
          var NewMessage = new Message(req.body)
          NewMessage.save()
        
          NewMessage = await NewMessage.populate("sender","fn ln")
          NewMessage = await NewMessage.populate("chat")
          NewMessage = await User.populate(NewMessage,{
            path:'chat.users',
            select:"fn ln m"
          })

          res.send(NewMessage)

    }catch(err){
            console.log(err)
            res.send(err)
    }
})

Messagerouter.get("/allmessages/:chatid", async (req,res)=>{

   
    try{
        
        const messages = await Message.find({chat:req.params.chatid}).populate("sender","fn ln m").populate("chat")


         res.send(messages)
    }catch(err){
            console.log(err)
            res.send(err)
    }
})
Messagerouter.post("/ReceiveNotifications",async (req,res)=>{
    console.log("came")
    try{
        const newnotification=new Notifications(req.body)
        await newnotification.save()
        res.send("Notifications send success")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
Messagerouter.get("/notifications/:receiverid",async (req,res)=>{
    try{
        var notifications=await Notifications.find({receiver:req.params.receiverid}).populate("sender","fn ln").populate("receiver")
        
        res.send(notifications)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


module.exports = Messagerouter




