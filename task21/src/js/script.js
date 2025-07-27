const API_KEY = "ac067ebf1130a5eb40a68301a80e8169";

const cities = {
    prague: { name: "Praha", lat: 50.0755, lon: 14.4378 },
    brno: { name: "Brno", lat: 49.1951, lon: 16.6068 },
    ostrava: { name: "Ostrava", lat: 49.8209, lon: 18.2625 },
    plzen: { name: "Plzeň", lat: 49.7475, lon: 13.3776 },
    liberec: { name: "Liberec", lat: 50.77, lon: 15.058 },
};

const updateBtn = document.getElementById("updateBtn");
const citySelect = document.getElementById("citySelect");
const weatherBox = document.getElementById("weather");

function populateSelect() {
    Object.entries(cities).forEach(([key, city]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createLine(label, value) {
    const p = document.createElement("p");
    p.textContent = `${label}: ${value}`;
    return p;
}

function createErrorMessage(message) {
    const error = document.createElement("p");
    error.textContent = message;
    error.style.color = "red";
    return error;
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error("Error fetching weather data");
            return res.json();
        })
        .then((data) => {
            clearContainer(weatherBox);

            const tempC = (data.main.temp - 273.15).toFixed(1);
            const feelsC = (data.main.feels_like - 273.15).toFixed(1);

            const title = document.createElement("h3");
            title.textContent = data.name;

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            icon.alt = data.weather[0].description;
            icon.title = data.weather[0].description;

            const temp = createLine("Temperature", `${tempC}°C`);
            const feels = createLine("Feels like", `${feelsC}°C`);
            const desc = createLine("Description", data.weather[0].description);
            const humidity = createLine("Humidity", `${data.main.humidity}%`);
            const wind = createLine("Wind", `${data.wind.speed} m/s`);
            const pressure = createLine("Pressure", `${data.main.pressure} hPa`);

            weatherBox.append(title, icon, temp, feels, desc, humidity, wind, pressure);
        })
        .catch((error) => {
            clearContainer(weatherBox);
            weatherBox.appendChild(createErrorMessage(error.message));
        })
        .finally(() => {
            console.log("Weather data fetched");
        });
}

function updateWeather() {
    const selectedKey = citySelect.value;
    const city = cities[selectedKey];

    clearContainer(weatherBox);

    if (!city) {
        weatherBox.appendChild(createErrorMessage("City not found"));
        return;
    }

    fetchWeatherByCoords(city.lat, city.lon);
}

window.addEventListener("load", () => {
    populateSelect();
    updateWeather();
});

updateBtn.addEventListener("click", updateWeather);
