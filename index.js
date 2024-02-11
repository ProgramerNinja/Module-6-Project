const userFormEl = document.querySelector('#user-form');
const submitButton = document.querySelector('#submit-button');
const citySearchTerm = document.querySelector('#city-name');
const activeCity = document.querySelector('#active-city')
const todayWeather = document.querySelector('.current-weather');
const fiveDayForecast = document.querySelector('#fiveday-list');
const APIKEY = proccess.env.APIKEY;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = citySearchTerm.value.trim();

  if (city) {
    citySearchTerm.value = '';
    todayWeather.textContent = '';
    fiveDayForecast.textContent = '';
    getCords(city);

  } else {
    alert('Please enter a City');
  }
};

var getCords = function (cityName) {
  let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIKEY;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          lat = data[0].lat;
          lon = data[0].lon;
          getForecast(lat, lon);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather Map GEO');
    });
};

var getForecast = function (lat, lon){
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKEY;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayForecast(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather Map Forecast');
    });
};

var displayForecast = function (data) {

  for (var i = 0; i < 5; i++) {

  if (data.cod !== "200") {
    fiveDayForecast.textContent = 'No Forecast found.';
    return;
  }

    weatherList = data.list[i * 8 + 3];

    var listItemEl = document.createElement('li')
    var dateEl = document.createElement('a');
    var statusEl = document.createElement('img')
    var tempEl = document.createElement('a');
    var windEl = document.createElement('a');
    var humidityEl = document.createElement('a')

    fiveDayForecast.appendChild(listItemEl);
    listItemEl.classList = 'list-item flex-row justify-space-between align-center';
    listItemEl.appendChild(dateEl);
    listItemEl.appendChild(statusEl);
    listItemEl.appendChild(tempEl);
    listItemEl.appendChild(windEl);
    listItemEl.appendChild(humidityEl);

    statusEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherList.weather[0].icon + '@2x.png');

    dateEl.classList = 'flex-row align-left';
    tempEl.classList = 'flex-row align-left';
    statusEl.classList = 'flex-row align-left';
    windEl.classList = 'flex-row align-left';
    humidityEl.classList = 'flex-row align-left';

    dateEl.textContent = 'Date: ' + weatherList.dt_txt;
    tempEl.textContent = 'Tempature: ' + weatherList.main.temp;
    windEl.textContent = 'Wind speed: ' + weatherList.wind.speed;
    humidityEl.textContent = 'Humidity: ' + weatherList.main.humidity;
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
