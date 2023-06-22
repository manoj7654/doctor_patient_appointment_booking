let baseUrl=``;

let formLogin=document.querySelector("form");

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    let obj={
        email,
        password
    }
    loginUser(obj);
  
})

async function loginUser(obj){
    console.log(obj)
    try {
        let res=await fetch("http://localhost:8080/users/login",{
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
            sessionStorage.setItem("email",result.email)
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