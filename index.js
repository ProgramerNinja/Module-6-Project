const userFormEl = document.querySelector('#user-form');
const submitButton = document.querySelector('#submit-button');
const citySearchTerm = document.querySelector('#city-name');
const todayWeather = document.querySelector('.current-weather');
const fiveDayForecast = document.querySelector('#fiveday-list');
const APIKEY = proccess.env.APIKEY;


var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = citySearchTerm.value.trim();

  if (city) {
    citySearchTerm.value = '';
    getCords(city);
    repoContainerEl.textContent = '';
  } else {
    alert('Please enter a City');
  }
};

// var buttonClickHandler = function (event) {
//   var language = event.target.getAttribute('data-language');

//   if (language) {
//     getFeaturedRepos(language);

//     repoContainerEl.textContent = '';
//   }
// };

var getCords = function (cityName) {
  let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + {cityName} + '&limit=1&appid=' + {APIKEY};

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          lat = data.lat;
          log = data.log;
          displayForecast(lat, log);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather Map GEO');
    });
};

var getForecast = function (lat, lon) {
  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + {lat} + '&lon=' + {lon} + '&appid=' + {APIKEY};

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayForecast(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather Map Forecast');
    });
};

// var displayForecast = function (repos, searchTerm) {
//   if (repos.length === 0) {
//     repoContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('a');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';
//     repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };

userFormEl.addEventListener('submit', formSubmitHandler);
// submitButton.addEventListener('click', buttonClickHandler);
