// ================= SELECT ELEMENTS =================
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast-cards');

// ================= OPENWEATHER API =================
const apiKey = '417769ed19d154f0fea9664f95d1478a';
const lat = 49.76; // Trier latitude
const lon = 6.64;  // Trier longitude
const units = 'metric'; // Celsius
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

// ================= FETCH CURRENT WEATHER =================
async function getCurrentWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
      console.log(data); // For testing
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// ================= DISPLAY CURRENT WEATHER =================
function displayCurrentWeather(data) {
  currentTemp.textContent = `${data.main.temp.toFixed(1)}°C`;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  captionDesc.textContent = data.weather[0].description;
}

// ================= FETCH 3-DAY FORECAST =================
async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
      console.log(data); // For testing
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// ================= DISPLAY 3-DAY FORECAST =================
function displayForecast(data) {
  // OpenWeatherMap provides data every 3 hours; we pick midday (12:00) for 3 days
  const middayData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

  forecastContainer.innerHTML = ''; // Clear container
  middayData.forEach(day => {
    const card = document.createElement('div');
    card.className = 'forecast-card';

    const date = new Date(day.dt_txt);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const dateStr = date.toLocaleDateString(undefined, options);

    const iconSrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    const temp = `${day.main.temp.toFixed(1)}°C`;
    const desc = day.weather[0].description;

    card.innerHTML = `
      <h4>${dateStr}</h4>
      <img src="${iconSrc}" alt="${desc}">
      <p>${temp}</p>
      <p>${desc}</p>
    `;

    forecastContainer.appendChild(card);
  });
}

// ================= INITIALIZE =================
getCurrentWeather();
getForecast();
