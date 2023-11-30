const express = require("express");
const chat = require("../model/chat");
const User = require("../model/User");

const chatrouter=express.Router();


chatrouter.post("/accesschat", async (req,res)=>{

    const userid = req.body.userid
    const loggedinuser=req.body.loggedinuser
    try{
         var chatavailable = await chat.find({
            $and:[
                {users:{$elemMatch:{$eq:loggedinuser}}},
                {users:{$elemMatch:{$eq:userid}}}
            ]
         }).populate("users","-p").populate("latestmessage")

         chatavailable= await User.populate(chatavailable,{
            path:"latestmessage.sender",
            select:"fn ln m"
         })
         if(chatavailable.length){
            res.send(chatavailable[0])
         }else{
            const newchat=new chat({
                chatname:"sender",
                users:[loggedinuser,userid]
            })
            await newchat.save()
            const createdchat = await chat.findOne({_id:newchat._id}).populate("users","-p")

            res.send(createdchat)

         }
    }catch(err){
            console.log(err)
            res.send(err)
    }
})

module.exports = chatrouter




