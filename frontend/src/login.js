
let formLogin=document.querySelector("form");

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;

    if(email==""||password==""){
        alert("Please enter email and password")
    }else{
        let obj={
            email,
            password
        }
        loginUser(obj);
    }
  
})

async function loginUser(obj){
    // console.log(obj)
    try {
        let res=await fetch("https://doctor-patient-ufir.onrender.com/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        let result=await res.json();
   
        if(result.message=="Login Successfuly"){
            sessionStorage.setItem("token",result.token);
            sessionStorage.setItem("role",result.role);
            sessionStorage.setItem("name",result.name)
            sessionStorage.setItem("email",result.email)
            sessionStorage.setItem("userID",result.useID)
            alert(result.message);
            window.location.href="./doctor.html";
        }else {
            alert(result.message)
        }
        
    } catch (error) {
        console.log("error while login from frontend");
        alert("error while login")
    }
}