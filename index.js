function formatDate() {
  let now = new Date();
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
  let div = document.querySelector(".date-today");
  div.innerHTML = `${month} ${date}, ${day} | ${hours}:${minutes} `;
  return div.innerHTML;
}
formatDate();

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector(".city-name");
  let input = document.querySelector("#search");
  cityElement.innerHTML = input.value;
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function convertToFarh(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);

  let farhLink = document.querySelector("#farh");
  farhLink.addEventListener("click", convertToFarh);
}

function convertToCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);

  let celLink = document.querySelector("#cel");
  celLink.addEventListener("click", convertToCel);
}
