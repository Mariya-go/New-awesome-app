src = "https://kit.fontawesome.com/57127feb29.js";
crossorigin = "anonymous";
let now = new Date();
function formatDate(formDate) {
  let date = formDate.getDate();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = week[formDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[formDate.getMonth()];
  let year = formDate.getFullYear();
  let dateOutput = document.querySelector("#date");
  dateOutput.innerHTML = `${day}, ${month} ${date}, ${year}`;
}

formatDate(now);

function formatTime(formTime) {
  let minutes = formTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = formTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let timeOutput = document.querySelector("#time");
  timeOutput.innerHTML = `${hours} : ${minutes}`;
}
formatTime(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-4">
                ${formatDay(forecastDay.dt)}
              </div>
              <div class="col-4">
              
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="weatherPicture" id="weatherPic" height="30px"> 
              </div>
              <div class="col-4">
                ${Math.round(forecastDay.temp.max)}° - ${Math.round(
          forecastDay.temp.min
        )}°
              </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getForecast(coordinats) {
  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinats.lat}&lon=${coordinats.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = temp;

  celsiusTemp = Math.round(response.data.main.temp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let cloudness = document.querySelector("#cloudness");
  cloudness.innerHTML = response.data.weather[0].description;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidityLevel = document.querySelector("#humidity-level");
  humidityLevel.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#weatherPic");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let fardegree = Math.round((celsiusTemp * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = `${fardegree}`;
}

function celsiusTemper(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = celsiusTemp;
}

function searchCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function currentLokation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemper);

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let current = document.querySelector("#current");
current.addEventListener("click", currentLokation);
