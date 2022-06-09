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
  let city = document.querySelector("#city");
  city.innerHTML = `${input.value}`;

  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = temp;
}

function degrees(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let temper = temp.innerHTML;
  temper = Number(temper);
  let fardegree = Math.round((temper * 9) / 5 + 32);
  temp.innerHTML = `${fardegree}`;
}
function cels(event) {
  event.preventDefault();
  temp.innerHTML = 14;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "957881f4ac9df8a6354696fa2849e81b";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", degrees);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", cels);

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let current = document.querySelector("#current");
current.addEventListener(
  "submit",
  navigator.geolocation.getCurrentPosition(currentPosition)
);
