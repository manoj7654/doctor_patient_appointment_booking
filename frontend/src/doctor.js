
const fetchDoctor=document.querySelector(".doctor");

// here fetching all the doctors data
async function fetchData(){
    try {
        const result=await fetch("https://doctor-patient-ufir.onrender.com/users/doctors");
        const res=await result.json();
        rederData(res)
        // console.log(res)
    } catch (error) {
        console.log(error)
    }
}
fetchData()

// here rendering all the doctors data
function rederData(res){
// console.log(res)
fetchDoctor.innerHTML="";
const result=res.map((ele)=>{
    return `
    <div class="card">
    <img src="https://www.shutterstock.com/image-photo/cheerful-mature-doctor-posing-smiling-260nw-1384243295.jpg" alt="img"/>
      <h4>Name:${ele.name}</h4>  
      <h4>Email:${ele.email}</h4>
      <h4>Specialist:${ele.specialty}</h4>
      <h4>Location:${ele.location}</h4>
      <button class="appointment" data-id=${ele._id}>Book Appointment</button>
    </div>
    
    `
    
})
fetchDoctor.innerHTML=result.join(" ")
const btns=document.querySelectorAll(".appointment");
for(let btn of btns){
    btn.addEventListener("click",(e)=>{
        let id=e.target.dataset.id
        sessionStorage.setItem("doctorId",id)
        var loginAlert = document.getElementById("loginAlert");
  loginAlert.style.display = "block";
  document.getElementById("closeBtn").addEventListener("click", function() {
    var loginAlert = document.getElementById("loginAlert");
    loginAlert.style.display = "none";
  });

    })
}
}

// for booking appointment

document.addEventListener('DOMContentLoaded', function() {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
  
    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();
  
    let minDate = year + '-' + month + '-' + (day+1);
    document.getElementById('date').setAttribute('min', minDate);
  });
const booking=document.querySelector(".booked");


const token=sessionStorage.getItem("token");
const userEmail=sessionStorage.getItem("email")
const doctorId=sessionStorage.getItem("doctorId")

booking.addEventListener("submit",(e)=>{
    // console.log(e)
    e.preventDefault();
   let bookingDate=document.getElementById("date").value
    let bookingSlot=document.getElementById("slot").value;
    const token=sessionStorage.getItem("token");
    const doctorId=sessionStorage.getItem("doctorId")

if(!token){
    alert("Please login first")
    window.location.href="./login.html"
}else if(bookingDate==""||bookingSlot==""){
    alert("Provide all the details")
}else{
    let obj={
        bookingDate,
        bookingSlot,
        doctorId:doctorId
    }
    bookingSlots(obj,token)
}
   
})


// booking creating  here
async function bookingSlots(obj){
    try {
        const booking=await fetch("https://doctor-patient-ufir.onrender.com/bookings/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`${token}`
            },
            body:JSON.stringify(obj)
        })
       const bookingData=await booking.json()
       if(bookingData.msg=="This Slot is Not Available."){
        alert("This seat is not available for this time.")
       }else if(bookingData.msg=="new booking created successfully Confiramtion sent to email"){
        alert("New Booking Created Successfully and confirmation sent to the your register email")
       }else{
        alert(bookingData.msg)
       }

    } catch (error) {
        console.log(error);
        alert("While creating booking something went wrong")
    }
}