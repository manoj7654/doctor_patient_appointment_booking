const mongoose=require("mongoose");

const doctorSchema=mongoose.Schema({
 name:String,
 email:String,
 
})

const DoctorModal=mongoose.model("doctors",doctorSchema);


module.exports={DoctorModal}