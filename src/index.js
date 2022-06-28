// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   sanfrancisco: {
//     temp: 20.9,
//     humidity: 100
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20
//   }
// };

// let city = prompt("Enter a city?");
// city = city.toLowerCase();
// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let humidity = weather[city].humidity;
//   let celsiusTemperature = Math.round(temperature);
//   let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

//   alert(
//     `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[today.getDay()];
let hours = today.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let time = currentDay + ", " + hours + ":" + minutes;
let currentTime = document.querySelector("#date");
currentTime.innerHTML = time;

function showTemperature(response) {
  let h5 = document.querySelector("h5");
  h5.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemperature");
  currentTemp.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d50daaabbd98c5b47ef6ff59824a0d1e&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityName = city.value;
  searchCity(cityName);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Kiev");

function showWeather(response) {
  let city = document.querySelector("h5");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#currentTemperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d50daaabbd98c5b47ef6ff59824a0d1e`;
  axios.get(url).then(showWeather);
}

function currentGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let current = document.querySelector("#geoTemp");
current.addEventListener("click", currentGeo);

//
// function convertFarenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#currentTemperature");
//   temperatureElement.innerHTML = 55;
// }

// function convertCelcii(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#currentTemperature");
//   temperatureElement.innerHTML = 13;
// }

// let temperatureFarenheit = document.querySelector("#farengeit");
// temperatureFarenheit.addEventListener("click", convertFarenheit);

// let temperatureCelcii = document.querySelector("#celcii");
// temperatureCelcii.addEventListener("click", convertCelcii);
