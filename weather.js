var latitude, longitude;
const lat_container = document.getElementById("lat");
const long_container = document.getElementById("long");
const weatherApi_Id = `57751d943f9fe0900865cc97d21dc5ec`;

window.addEventListener("load", ()=>{
    latitude = localStorage.getItem("lat");
    longitude = localStorage.getItem("long");

    lat_container.innerText = latitude;
    long_container.innerText = longitude;
    // console.log(latitude, longitude);

    const map_container = document.getElementById("map_container");
    map_container.innerHTML = `
    <iframe class="map" src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=18&output=embed" width="90%" height="100%" frameborder="0" style="border:0"></iframe>
    `;

    fetchWeatherData(latitude, longitude);


});

async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApi_Id}`;
    try{
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        document.getElementById("location").innerText = `${result.name}`;
        document.getElementById("speed").innerText = `${((result.wind.speed)*3.6).toFixed(2)} kmph`;
        document.getElementById("humidity").innerText = `${result.main.humidity}%`;
        document.getElementById("timezone").innerText = `${secondsToTimeZoneString(result.timezone)}`;
        document.getElementById("pressure").innerText = `${(result.main.pressure * 0.000987).toFixed()} atm`;
        document.getElementById("direction").innerText = `${getWindDirection(result.wind.deg)}`;
        document.getElementById("feels").innerText = `${(result.main.feels_like - 273.15).toFixed()}`;
    } catch(error) {
        alert("An error has Occured");
        console.log(error);
    }
}

function secondsToTimeZoneString(offsetSeconds) {
    const hours = Math.floor(offsetSeconds / 3600); 
    const minutes = Math.floor((offsetSeconds % 3600) / 60); 
    const sign = offsetSeconds < 0 ? '-' : '+';
    const formattedOffset = `${sign}${Math.abs(hours).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return `GMT ${formattedOffset}`;
}  
    

function getWindDirection(degrees){
    const directions = [
        "North",
        "North-North-East",
        "North-East",
        "East-North-East",
        "East",
        "East-South-East",
        "South-East",
        "South-South-East",
        "South",
        "South-South-West",
        "South-West",
        "West-South-West",
        "West",
        "West-North-West",
        "North-West",
        "North-NorthWest",
      ];

      const idx = Math.round(degrees / 22.5) % 16;
      return directions[idx];
}