const apiKey = "412cf6818da1417a95c01439251408";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uv-index");

async function getWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("A cidade digitada não foi encontrada");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.classList.add("hidden");
    weatherResult.classList.remove("hidden");

    cityName.innerText = `${data.location.name} - ${data.location.country}`;
    localTime.innerText = `Hora local: ${data.location.localtime}`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    temperature.innerText = `${data.current.temp_c}°C`;
    condition.innerText = data.current.condition.text;

    feelsLike.innerText = `${data.current.feelslike_c}°C`;
    humidity.innerText = `${data.current.humidity}%`;
    windSpeed.innerText = `${data.current.wind_kph} km/h`;
    pressure.innerText = `${data.current.pressure_mb} hPa`;
    visibility.innerText = `${data.current.vis_km} km`;
    uvIndex.innerText = data.current.uv;
}

function showError(message) {
    weatherResult.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").innerText = message;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

//inicia com o clima de Junqueiro, haha
window.addEventListener("load", () => {
    getWeather("Junqueiro");
});