
const fetchDoctor=document.querySelector(".doctor");

const bag=[]
async function fetchData(){
    try {
        const result=await fetch("http://localhost:8080/users/doctors");
        const res=await result.json();
        rederData(res)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
fetchData()

function rederData(res){
console.log(res)
fetchDoctor.innerHTML="";
const result=res.map((ele)=>{
    return `
    <div class="card">
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
        localStorage.setItem("doctorId",id)
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

const booking=document.querySelector(".booked");
// console.log(booking)

const token=sessionStorage.getItem("token");
// console.log(token)
const userEmail=sessionStorage.getItem("email")
const doctorId=localStorage.getItem("doctorId")

booking.addEventListener("submit",(e)=>{
    console.log(e)
    e.preventDefault();
   let bookingDate=document.getElementById("date").value
    
    let bookingSlot=document.getElementById("slot").value;
    
    let obj={
        bookingDate,
        bookingSlot,
        userEmail:userEmail,
        doctorId:doctorId
    
    }
    console.log(obj)
    bookingSlots(obj,token)
})

// document.addEventListener('DOMContentLoaded', function() {
//     let dtToday = new Date();
//     let month = dtToday.getMonth() + 1;
//     let day = dtToday.getDate();
//     let year = dtToday.getFullYear();
  
//     if (month < 10)
//       month = '0' + month.toString();
//     if (day < 10)
//       day = '0' + day.toString();
  
//     let minDate = year + '-' + month + '-' + day;
//     document.getElementById('inputdate').setAttribute('min', minDate);
//   });

async function bookingSlots(obj){
    try {
        const booking=await fetch("http://localhost:8080/bookings/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`${token}`
            },
            body:JSON.stringify(obj)
        })
       const bookingData=await booking.json()
       console.log(bookingData)
       if(!token){
        alert("Please login first")
        window.location.href="./login.html"
       }
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