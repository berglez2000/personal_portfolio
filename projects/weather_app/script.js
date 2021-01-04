// Variables
// Api
const api = "5f5bca54581f0d02690e30dfaeb0e07c";
// Elements
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const input = document.querySelector("#city");
const searchContainer = document.querySelector(".search-container");
const mainContainer = document.querySelector(".main-container");
const mainContainerElements = document.querySelectorAll(".weather-day");
const returnBtn = document.querySelector(".return");
// Elements to change
const cityName = document.querySelector(".title");
const degrees1 = document.querySelector(".degrees-1");
const img1 = document.querySelector("#img-1");
const desc1 = document.querySelector(".description-1");

// Boolean value
let isChecked = false;
// Date
let curDate = new Date().toISOString().slice(0, 10);


const main = () => {
  // Check if input is correct
  const checkData = () => {
    if (input.value === "" || input.value === null){
      return alert("Prosim izpolnite polje ali kliknite na gumb moja lokacija");
    } else {
      return isChecked = true;
    }
  }


  // Change div
  const changeDisplay = () => {
    let tl = gsap.timeline();
    tl.to(searchContainer, {duration: 1, x: "100%"});
    tl.to(mainContainer, {duration: 0.25, x: "0%"});
    tl.from(mainContainerElements, {duration: 1, opacity: 0, stagger: 0.15, x: -100});
    tl.to(searchContainer, {duration: 0, display: "none"});
  }

  const fetchData = (link) => {
    fetch(link)
      .then(response => response.json())
      .then(data => {
      cityName.textContent = data.city.name;
      let currentWeather = data.list[0];
      const currentTemp = Math.floor(currentWeather.main.temp - 277.15);
      const icon = currentWeather.weather[0].icon;
      const description = currentWeather.weather[0].description;
      // current weather (day-1)
      degrees1.textContent = `${currentTemp}°C`;
      img1.src = `img/${icon}.png`;
      desc1.textContent = description;
      // other days
      let day = 1;
      for (let i = 0; i < data.list.length; i++){
        const time = data.list[i].dt_txt.split(" ")[1];
        const date = data.list[i].dt_txt.split(" ")[0];
        if (time === "12:00:00"){
          if (date !== curDate){
            day++;
            const temp = Math.floor(data.list[i].main.temp - 277.15);
            const icon = data.list[i].weather[0].icon;
            const desc = data.list[i].weather[0].description;
            mainContainerElements.forEach((elem) => {
              if (elem.children[0].classList[0] === `day-${day}`){
                const weatherDay = elem.children[0];
                weatherDay.textContent = date;
                const img = elem.children[1].children[0].children[0];
                const dayTemp = elem.children[1].children[0].children[1];
                const daydescription = elem.children[1].children[1].children[0];
                
                img.src = `img/${icon}.png`;
                dayTemp.textContent = `${temp}°C`;
                daydescription.textContent = desc;
              }
            });
          }
        }
      }
    });
  }

  const showData = () => {
    let city = input.value;
    let link = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`;

    fetchData(link);
  }

  // Your location btn
  // Find coords
  const findCoords = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;
      const link = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}`;
      fetchData(link);
    });

  }


  // Search weather
  const searchWeather = (e) => {
    e.preventDefault();
    checkData();
    if (isChecked){
      changeDisplay();
      showData();
    }

    input.value = "";
  }

  // Your location
  searchBtn.addEventListener("click", searchWeather);
  locationBtn.addEventListener("click", (e) => {
    e.preventDefault();
    findCoords();
    changeDisplay();
  });

  returnBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
}


window.addEventListener("load", main);
