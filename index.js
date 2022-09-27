function formatDate(timestamp) {
  let now = new Date(timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${month} ${date}, ${day} | ${hours}:${minutes} `;
}

function formatForecastDay(timestamp) {
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

function formatForecastDate(day) {
  let date = new Date(day * 1000);
  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Nov",
    "Dec",
  ];
  let dateToday = date.getDate();
  if (dateToday < 10) {
    dateToday = `0${dateToday}`;
  }
  return `${months[month]} ${dateToday}`;
}

function fetchForecastData(coord) {
  console.log(coord);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row week">`;
  dailyForecast.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 shadow-sm day">
                <h5>${formatForecastDay(forecast.dt)}</h5>
                <div class="date">${formatForecastDate(forecast.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png"
                  alt="drizzle"
                  class="weather-icon"
                  width="110px"
                />
                <div class="temperature">${Math.round(
                  forecast.temp.max
                )}˚/ ${Math.round(forecast.temp.min)}˚</div>
                <div class="forecast">${forecast.weather[0].description}</div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  document.querySelector(".city-name").innerHTML =
    response.data.name.toUpperCase();
  celciusTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  fetchForecastData(response.data.coord);
}

let celciusTemperature = null;

function search(city) {
  let apiKey = "f0553e70ab5eb275ae36ae41c6ace9b0";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

search("Tokyo");

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celciusLink.classList.remove("celcius");
  fahrenheitLink.classList.add("celcius");
  tempElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  fahrenheitLink.classList.remove("celcius");
  celciusLink.classList.add("celcius");
  tempElement.innerHTML = Math.round(celciusTemperature);
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

// function showTemperature(response) {
//   console.log(response.data);
//   debugger;
//   document.querySelector(".city-name").innerHTML =
//     response.data.name.toUpperCase();
//   document.querySelector("#temp").innerHTML = Math.round(
//     response.data.main.temp
//   );
//   document.querySelector("#description").innerHTML =
//     response.data.weather[0].main;
//   let max = Math.round(response.data.main.temp_max);
//   let maxElement = document.querySelector("#max");
//   maxElement.innerHTML = `${max}˚`;
//   let min = Math.round(response.data.main.temp_min);
//   let minElement = document.querySelector("#min");
//   minElement.innerHTML = `${min}˚`;
//   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//   document.querySelector("#wind").innerHTML = Math.round(
//     response.data.wind.speed
//   );
// }

// let button = document.querySelector("#search");
// button.addEventListener("click", showTemperature);

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f0553e70ab5eb275ae36ae41c6ace9b0";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(showLocation);

function showTokyoWeather(event) {
  event.preventDefault();
  let tokyoApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=f0553e70ab5eb275ae36ae41c6ace9b0&units=metric";
  axios.get(tokyoApiUrl).then(displayWeather);
}

let tokyoElement = document.querySelector("#tokyo-element");
tokyoElement.addEventListener("click", showTokyoWeather);

function showNewYorkWeather(event) {
  event.preventDefault();
  let newYorkApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=new york&appid=f0553e70ab5eb275ae36ae41c6ace9b0&units=metric";
  axios.get(newYorkApiUrl).then(displayWeather);
}

let newyorkElement = document.querySelector("#new-york-element");
newyorkElement.addEventListener("click", showNewYorkWeather);

function showManilaWeather(event) {
  event.preventDefault();
  let manilaApiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=manila&appid=f0553e70ab5eb275ae36ae41c6ace9b0&units=metric";
  axios.get(manilaApiUrl).then(displayWeather);
}

let manilaElement = document.querySelector("#manila-element");
manilaElement.addEventListener("click", showManilaWeather);
