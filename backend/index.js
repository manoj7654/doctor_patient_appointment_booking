// importing express for making server
const express=require("express")
const app=express();

// importing dotenv for accessing env file
require("dotenv").config()
const connection=require("./config/db")

const {Server}=require("socket.io");
const http=require("http");

const http_Server=http.createServer(app)

// importing userRouter from routes for accessing routes
const {userRouter}=require("./routes/userRoutes")
const {bookingRouter}=require("./routes/bookingRoute")
const cors=require("cors")
// middleware 
app.use(express.json())


app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.use("/users",userRouter)
app.use("/bookings",bookingRouter)

const io=new Server(http_Server)
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/:room",(req,res)=>{
  res.render('room',{roomId: req.params.room});
});

io.on("connection",(socket)=>{
  socket.on('join-room',(roomId,userId)=>{
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected',userId);

    socket.on('disconnect',()=>{
      socket.broadcast.to(roomId).emit('user-disconnected',userId);
    });
  })
});

// Server is running 
http_Server.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Getting error while connected to DB")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})



