
const patient=document.querySelector(".patient");
const patientForm=document.getElementById("patient")
const doctorForm=document.getElementById("doctor")

doctorForm.style.display="none"
// patientForm.style.display="none"
patient.addEventListener("click",()=>{
    patientForm.style.display = "block";
    doctorForm.style.display="none"

})

const doctor=document.querySelector(".doctor");

doctor.addEventListener("click",()=>{
    patientForm.style.display="none"
    doctorForm.style.display = "block";
    
   
})

