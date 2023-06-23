
// getting role,name,token from sesstion Storage
const role = sessionStorage.getItem("role");
const name = sessionStorage.getItem("name");
const token = sessionStorage.getItem("token");

// here checking if user is logged in then show all the data otherwise sent it to login page
if (token) {
  async function fetchBooking() {
    try {
      const result = await fetch(`http://localhost:8080/bookings/singleUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      let res = await result.json();
      console.log(res);
      displayBooking(res.Data, name, role, token);
    } catch (error) {
      console.log(error);
    }
  }
  fetchBooking();

  // for rendering all bookings for particular users
  function displayBooking(Data, name, role, token) {
    const render = document.querySelector(".app");
    render.innerHTML = "";
    
    const result = Data.map((ele) => {
      
      return `
      
        <div class="card">
     
          <h4>Name:${name}</h4>  
          <h4>Role:${role}</h4>  
          <h4>Email:${ele.email}</h4>
          <h4>Booking Date:${ele.bookingDate}</h4>
          <h4>Booking Time:${ele.bookingSlot}</h4>
          <button class="video" data-id=${ele._id}>Video</button>
          <button class="cancel" data-id=${ele._id}>Cancel</button>
        </div>
        
        `;
    });
    render.innerHTML = result.join("");
    let cancelBtns = document.querySelectorAll(".cancel");

    for (let Btn of cancelBtns) {
      Btn.addEventListener("click", (e) => {
        let ID = e.target.dataset.id;
        console.log(ID);
        cancelAppointment(ID, token);
      });
    }
  }

  // for deleting particular user not doctor
  async function cancelAppointment(ID, token) {
    try {
      let res = await fetch(`http://localhost:8080/bookings/delete/${ID}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });
      let result = await res.json();
    //   console.log(result);
      if (result.msg == `booking id of ${ID} is deleted succesfully`) {
        fetchBooking();
        alert(`Your Booking Successfully Cancelled`);
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.log(error);
      alert(result.msg);
    }
  }
} else {
  alert("Login First to Access this Page");
  window.location.href = "./login.html";
}
