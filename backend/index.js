const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
require("dotenv").config()
const cors=require('cors');
const UserInfoRoutes = require('./routes/User');
const cookieParser = require("cookie-parser");
const VehicleRoutes = require('./routes/AddVehicle');
const PublishRidesRoutes = require('./routes/PublishRide');
const BookRideRoutes = require('./routes/BookRide');
const chatrouter = require('./routes/ChatRoutes');
const Messagerouter = require('./routes/MessageRoutes');
const AdminRoutes = require('./routes/AdminRoutes');

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

const url="mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.vwmjadt.mongodb.net/?retryWrites=true&w=majority"



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

app.use(VehicleRoutes)
app.use(PublishRidesRoutes)
app.use(BookRideRoutes)
app.use(chatrouter)
app.use(Messagerouter)
app.use(AdminRoutes)
// module.exports.handler=serverless(app)
const server = app.listen(8001)
const io = require("socket.io")(server,{
	cors:{
		origin:"http://localhost:3000"
	}
})

io.on("connection",(socket)=>{
	socket.on('setup',(userData)=>{
		socket.join(userData._id)
		console.log(userData)
		socket.emit("connected");
	})
	socket.on("chatjoin",(room)=>{
		socket.join(room)
		console.log("User joined in room")
	})

	socket.on("sendmessage",(message)=>{
		var chat = message.chat
		chat.users.forEach(user => {
			if(user._id===message.sender._id){
				return
			}
			socket.in(user._id).emit("messagereceived",message)
		});
	})
	socket.off("setup",()=>{
		console.log("User Disconnected")
		socket.leave(userData._id)
	})

})