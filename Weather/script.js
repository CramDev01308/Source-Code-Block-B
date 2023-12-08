const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=city&units=metric&appid=c5481827797b8c5f8dec85720877f5a6';
const outputElement = document.querySelector('.weather');

document.querySelector('.search button').addEventListener('click', function () {
  const city = document.querySelector('.search-bar').value;
  fetchWeather(city);
});

document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const city = document.querySelector('.search-bar').value;
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const url = apiUrl.replace('city', city);
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.error('Error:', error));
}

function displayWeather(data) {
  const { name, weather, main, wind, sys } = data;
  const { icon, description } = weather[0];
  const { temp, humidity } = main;
  const { speed } = wind;
  const { country } = sys;

  const weatherInfo = `
    <h2 class="city">Weather in ${name}</h2>
    <p class="country">${country}</p>
    <h1 class="temp">${temp} °C</h1>
    <div class="flex">
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" class="icon" />
      <div class="description">${description}</div>
    </div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind Speed: ${speed} km/h</div>
  `;

  outputElement.innerHTML = weatherInfo;
}