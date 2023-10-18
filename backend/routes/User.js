const express = require("express")
const User = require("../model/User")
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const UserInfoRoutes = express.Router()
const path = require('path');
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;


const createToken = (id) => {
    return jwt.sign({ id }, "Car Go-Connect Secret Key", {
      expiresIn: maxAge,
    });
  };

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'cargoconnectconnect@gmail.com',
            pass: 'cargoconnect',
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

UserInfoRoutes.post("/userinfo",async (req, res) => {
    console.log(req.body,"user Info")
    try {
        const userinfo = new User(req.body)
        console.log(userinfo,"2")
        await userinfo.save()
        const token = createToken(userinfo._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
        res.send(userinfo._id)
       
    } catch (err) {
        res.send("Error While Submiting JOb")
    }
    
})

UserInfoRoutes.post("/verifyotp",async (req, res) => {
    console.log(req.body)
    var otp = Math.floor(Math.random() * 9000 + 1000);

    console.log(req.body)
    const mailData = {
          from: 'cargoconnectconnect@gmail.com',  
          to: req.body.mail,
          subject: otp +'- Verify Otp',
          template:'email',
          context:{
             name:"",
             code:otp,
             mail:req.body.email

          }
       
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err){
                console.log(err)
               res.json({
                
                message:"server error try again",
               })}
            else{
              res.json({
                otp:otp,
                message:"OTP sent to "+req.body.mail,
              })
            }
         });
       
   
})

UserInfoRoutes.get("/checkmail/:mail", async (req,res)=>{
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

UserInfoRoutes.post("/SendCookie",(req,res)=>{
    try{
    const token = createToken(req.body.id);
    res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.send(req.body.id)
    }catch(err){
        console.log(err)
    }
})

UserInfoRoutes.post("/VerifyUser", (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        "Car Go-Connect Secret Key",
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const user = await User.findById(decodedToken.id);
            if (user) res.json({ status: true, user: user.email });
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

module.exports=UserInfoRoutes

