//Minha API Key
const apiKey = "412cf6818da1417a95c01439251408";

//Pegando os dados
const cidade = document.getElementById("city-input");
const botao = document.getElementById("search-btn");
const resultadoClima = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cidadeNome = document.getElementById("city-name");
const tempoLocal = document.getElementById("local-time");
const iconeClima = document.getElementById("weather-icon");
const temperatura = document.getElementById("temperature");
const condicao = document.getElementById("condition");
const sensacao = document.getElementById("feels-like");
const humidade = document.getElementById("humidity");
const vento = document.getElementById("wind-speed");
const pressao = document.getElementById("pressure");
const visibilidade = document.getElementById("visibility");
const uv = document.getElementById("uv-index");

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

//Mostrando os dados
function displayWeather(data) {
    errorMessage.classList.add("hidden");
    resultadoClima.classList.remove("hidden");

    const dataCidade = new Date(data.location.localtime).toLocaleDateString('pt-br') 
    const horaCidade = new Date(data.location.localtime).toLocaleTimeString('pt-br') 

    //console.log(data.location.localtime)
    //console.log(new Date(data.location.localtime).toLocaleTimeString('pt-br'))

    cidadeNome.innerText = `${data.location.name} - ${data.location.country}`;
    tempoLocal.innerText = `Hora local: ${dataCidade} - ${horaCidade}`;
    iconeClima.src = `https:${data.current.condition.icon}`;
    temperatura.innerText = `${data.current.temp_c}°C`;
    condicao.innerText = data.current.condition.text;

    sensacao.innerText = `${data.current.feelslike_c}°C`;
    humidade.innerText = `${data.current.humidity}%`;
    vento.innerText = `${data.current.wind_kph} km/h`;
    pressao.innerText = `${data.current.pressure_mb} hPa`;
    visibilidade.innerText = `${data.current.vis_km} km`;
    uv.innerText = data.current.uv;
}

function showError(message) {
    resultadoClima.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").innerText = message;
}

botao.addEventListener("click", () => {
    const city = cidade.value.trim();
    if (city) {
        getWeather(city);
    }
});

//inicia com o clima de Junqueiro, haha
window.addEventListener("load", () => {
    getWeather("Junqueiro Al");
});
