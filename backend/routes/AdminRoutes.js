const express = require("express")
const Admin = require("../model/Admin")
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const AdminRoutes = express.Router()
const path = require('path');
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "Car booking secret key", {
      expiresIn: maxAge,
    });
};

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'jobsportelmain@gmail.com',
            pass: 'paxvwxfxwzvzkhih',
         },
    secure: true,
});

const handlebarOptions ={
    viewEngine:{
        extName:".handlebars",
        partialsDir:path.resolve('./Views'),
        defaultLayout:false,
    },
    viewPath:path.resolve('./Views'),
    extName:".handlebars",

}


transporter.use('compile', hbs(handlebarOptions));

console.log(transporter)

AdminRoutes.post("/verifyadmin", async (req,res)=>{
    
    try{
        const admin = await Admin.findOne({username:req.body.username,p:req.body.p})
        console.log(admin)
        if(admin){
            res.send({
                value:true
            })
        }else{
            res.send({
                value:false
            })
        }
    }catch(err){
            res.send(err)
    }
})

AdminRoutes.post("/userinfo",async (req, res) => {
    console.log(req.body,"user Info")
    try {
        const userinfo = new User(req.body)
        console.log(userinfo,"2")
        await userinfo.save()
        const token = createToken(userinfo._id);
        res.send({
          token:token
        
        })
       
    } catch (err) {
        res.send("Error While Submiting")
    }
    
})



AdminRoutes.get("/checkmail/:mail", async (req,res)=>{
     console.log(req.params)
     try{
        const mail= await User.findOne({m:req.params.mail})
         console.log(mail)
        if(mail){
            res.send({
                value:true,
                userid:mail._id,
                p:mail.p,
                id:mail._id
            })
        }else{
            res.send({
                value:false,
            })
        }
     }catch{
         res.send("Network Error")
     }
})

AdminRoutes.post("/SendCookie",(req,res)=>{
  console.log("Send cookie",req.body)
    try{
    const token = createToken(req.body.id);
      res.send({
        token:token
      })
    }catch(err){
        console.log(err)
    }
})

AdminRoutes.post("/VerifyUser", (req, res, next) => {
    const token = req.body.jwt;
    if (token) {
      jwt.verify(
        token,
        "Car booking secret key",
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const user = await User.findById(decodedToken.id);
            if (user) res.json({ status: true, user: user.email,id:user._id,name:user.fn+" "+user.ln });
            else res.json({ status: false });
            next();
          }
        }
      );
    } else {
      res.json({ status: false });
      next();
    }
  })

module.exports=AdminRoutes


