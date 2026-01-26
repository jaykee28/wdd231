// ================= SELECT SECTIONS =================
const weatherSection = document.querySelector('.weather');
const spotlightSection = document.querySelector('.spotlights');

// ================= SELECT EXISTING WEATHER ELEMENTS =================
const currentWeatherDiv = document.querySelector('.current-weather'); // container for icon + details
const weatherDetails = document.getElementById('weather-details'); // current weather info
const forecastDiv = document.getElementById('forecast'); // 3-day forecast

// ================= WEATHER API =================
const apiKey = '417769ed19d154f0fea9664f95d1478a';
const lat = -33.9258; // Cape Town
const lon = 18.4232;
const units = 'metric';

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

// ================= FETCH WEATHER =================
async function getWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather API Error');

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    displayWeather(currentData, forecastData);
  } catch (error) {
    console.error(error);
    weatherDetails.innerHTML = '<p>Unable to load weather data.</p>';
  }
}

// ================= DISPLAY WEATHER =================
function displayWeather(current, forecast) {
  // --- CURRENT WEATHER ---
  const temp = Math.round(current.main.temp);
  const high = Math.round(current.main.temp_max);
  const low = Math.round(current.main.temp_min);
  const humidity = current.main.humidity;
  const sky = current.weather[0].description;

  const sunrise = new Date(current.sys.sunrise * 1000)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(current.sys.sunset * 1000)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Weather Icon
  let weatherIcon = document.getElementById('weather-icon');
  if (!weatherIcon) {
    weatherIcon = document.createElement('img');
    weatherIcon.id = 'weather-icon';
    weatherIcon.loading = 'lazy';
    currentWeatherDiv.prepend(weatherIcon);
  }
  weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  weatherIcon.alt = sky;

  // Weather Details
  weatherDetails.innerHTML = `
    <p><strong>${temp}°C</strong></p>
    <p>${sky}</p>
    <p>High: ${high}°C</p>
    <p>Low: ${low}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Sunrise: ${sunrise}</p>
    <p>Sunset: ${sunset}</p>
  `;

  // --- 3-DAY FORECAST ---
  forecastDiv.innerHTML = ''; // clear previous content

  const daily = forecast.list
    .filter(item => item.dt_txt.includes('12:00:00')) // midday forecasts
    .slice(0, 3);

  daily.forEach(day => {
    const weekday = new Date(day.dt * 1000)
      .toLocaleDateString(undefined, { weekday: 'long' });
    const dayTemp = Math.round(day.main.temp);

    const dayDiv = document.createElement('div');
    dayDiv.classList.add('forecast-day');
    dayDiv.innerHTML = `
      <strong>${weekday}:</strong> ${dayTemp}°C
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}" />
    `;
    forecastDiv.appendChild(dayDiv);
  });
}

// ================= SPOTLIGHTS =================
async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Members fetch failed');

    const members = await response.json();

    const eligible = members.filter(m => m.membership === 2 || m.membership === 3);

    const selected = eligible
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    spotlightSection.querySelectorAll('.spotlight-card').forEach(card => card.remove());

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <h4>${member.name}</h4>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><strong>${member.membership === 3 ? 'Gold' : 'Silver'} Member</strong></p>
        <a href="${member.website}" target="_blank" class="cta-button">Visit Website</a>
      `;

      spotlightSection.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    spotlightSection.innerHTML += '<p>Unable to load spotlights.</p>';
  }
}

// ================= INITIALIZE =================
getWeather();
getSpotlights();
