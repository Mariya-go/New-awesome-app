src = "https://kit.fontawesome.com/57127feb29.js";
crossorigin = "anonymous";
let now = new Date();
function formatDate(formDate) {
  let date = formDate.getDate();
  let week = [
    "Sonday",
    "Monday",
    "Tuesday",
    "Wednesdasy",
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
  let hours = formTime.getHours();
  let timeOutput = document.querySelector("#time");
  timeOutput.innerHTML = `${hours} : ${minutes}`;
}
formatTime(now);

function handleSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  console.log(response.data);
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
}

//function degrees(event) {
//event.preventDefault();
// let temp = document.querySelector("#temp");
//let temper = temp.innerHTML;
// temper = Number(temper);

//}

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
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

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
