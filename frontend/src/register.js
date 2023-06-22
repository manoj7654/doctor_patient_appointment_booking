
const patient=document.querySelector(".patient");
const patientForm=document.getElementById("patient")
const doctorForm=document.getElementById("doctor")

doctorForm.style.display="none"
patientForm.style.display="none"
patient.addEventListener("click",()=>{
    patientForm.style.display = "block";
    doctorForm.style.display="none"

})

const doctor=document.querySelector(".doctor");

doctor.addEventListener("click",()=>{
    patientForm.style.display="none"
    doctorForm.style.display = "block";
    
   
})

// for patient registration form 
let form1=document.getElementById("form1");

form1.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value
    let gender=document.getElementById("gender").value
    let location=document.getElementById("location").value

    let obj={
        name,email,password,gender,location
    }
    console.log(obj)
    postPatient(obj)
})
async function postPatient(obj){
    try {
        const result1=await fetch("http://localhost:8080/users/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        const res1=await result1.json()
        if(res1.message=="Registration successfully"){
            alert(res1.message)
            window.location.href="login.html"
        }else{
            alert(res1.message)
        }
    } catch (error) {
        console.log("error while login from frontend");
        alert("error while register")
    }
}







// for Doctor registration form
let form2=document.getElementById("form2");

form2.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=document.getElementById("name1").value
    let email=document.getElementById("email1").value
    let password=document.getElementById("password1").value
    let role=document.getElementById("role").value
    let gender=document.getElementById("gender1").value
    let specialty=document.getElementById("speciality1").value
    let location=document.getElementById("location1").value


    let obj2={
        name,email,password,role,gender,specialty,location
    }
    console.log(obj2)
    postDoctor(obj2)
})

async function postDoctor(obj2){
    try {
        const result=await fetch("http://localhost:8080/users/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj2)
        })
        const res=await result.json()
        if(res.message=="Registration successfully"){
            alert(res.message)
            window.location.href="login.html"
        }else{
            alert(res.message)
        }
    } catch (error) {
        console.log("error while login from frontend");
        alert("error while register")
    }
}
