const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require("dotenv").config()
const cors=require('cors');
const UserInfoRoutes = require('./routes/User');
const cookieParser = require("cookie-parser");

const app=express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
mongoose.set('strictQuery', true)


app.use(cors({
	origin:["http://localhost:3000"],
	methods: ["GET", "POST"],
    credentials: true,
}))

app.use(cookieParser())

const url="mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.xnxqjh7.mongodb.net/carbooking?retryWrites=true&w=majority"



mongoose.connect(url,{ useNewUrlParser: true }).then(res=>{
    console.log("connected successfully to mango db")

})
.catch(err=>{
    console.log(err)
})
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
	});

app.use("/api/carbooking/v1",UserInfoRoutes)


module.exports.handler=serverless(app)
app.listen(8000)