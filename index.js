const apiKey = '1b932d888dced22bcdb06748439b75a4';
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetchWeather(location);
    } else {
        displayError('Please enter a city.');
    }
});

function fetchWeather(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('An error occurred while fetching data. Please try again later.');
        });
}

function displayWeather(data) {
    const { name, main, wind, weather } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    const weatherHtml = `
        <div class="weather-icons">
            <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
            <h2>${name}</h2>
        </div>
        <p><strong>Temperature:</strong> ${main.temp} °C</p>
        <p><strong>Humidity:</strong> ${main.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
    weatherInfo.classList.add('animate__animated', 'animate__fadeIn');
    errorMessage.textContent = ''; 
    errorMessage.classList.add('hidden');
}

function displayError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}
