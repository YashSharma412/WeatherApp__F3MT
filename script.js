var latitude, longitude;
const fetchData_btn = document.getElementById('fetchBtn');
fetchData_btn.addEventListener("click", (event)=>{
    fetchLocation();
});

function hideAnimate() {
    // console.log("hide");   
    const hideElements = document.querySelectorAll("body *");
    hideElements.forEach((element)=>{
        element.classList.toggle("hide");
    });
}

function fetchLocation() {
    // console.log("flag!", event.target);
    navigator.geolocation.getCurrentPosition(success, error);
}


function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
    localStorage.setItem("lat", latitude);
    localStorage.setItem("long", longitude);
    hideAnimate();
    setTimeout(()=>{
        window.location.href = `weather.html`;
    },500)
}

function error(error) {
    alert("Please allow permission to access location, in order to proceed.")
    console.log(error);
}
// const success = (position)=>{
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     console.log(latitude, longitude);
//     localStorage.setItem("lat", latitude);
//     localStorage.setItem("long", longitude);
// }

// const error = (error)=>{
//     alert("Please allow permission to access location, in order to proceed.")
//     console.log(error);
// }

