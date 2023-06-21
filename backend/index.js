const express=require("express");
const app=express();

require("dotenv").config()
const connection=require("./config/db")


const {userRouter}=require("./routes/userRoutes")
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello from server")
})
app.use("/users",userRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Getting error while connected to DB")
    }
    console.log(`Server is running on port no ${process.env.port}`)
})



