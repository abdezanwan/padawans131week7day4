// Your OpenWeather API Key
const apiKey = '0f5e4c194b9269171f1aedb033a4b77a';

// Event Listener for Form Submission
document.querySelector('form').addEventListener('submit', (event) => {
    console.log(">>> submit form <<<")
    event.preventDefault();
    const cityName = document.getElementById('searched-city').value;
    cityData(cityName);
});

// Function to Fetch Weather Data
const cityData = async (name) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();

        const cityWeatherF = kelvinToFahrenheit(data.main.temp);
        const cityHighF = kelvinToFahrenheit(data.main.temp_max);
        const cityLowF = kelvinToFahrenheit(data.main.temp_min);
        const cityForecast = data.weather[0].description;
        const cityHumi = data.main.humidity;
        console.log('data response: ', data)
        displayWeather(name, cityWeatherF, cityHighF, cityLowF, cityForecast, cityHumi);
    } catch (error) {
        console.error('Error:', error);
        // Handle the error, e.g., display an error message to the user.
    }
};

// Function to convert Kelvin to Fahrenheit
const kelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
};

// Function to Display Weather Data
const displayWeather = (city, currentTemp, highTemp, lowTemp, forecast, humidity) => {
    const weatherDeetz = document.getElementById('weatherDeetz');
    weatherDeetz.innerHTML = `
        <h2>${city}</h2>
        <h3>Current Temp is: ${currentTemp}°F</h3>
        <h5>Today's High: ${highTemp}°F</h5>
        <h5>Today's Low: ${lowTemp}°F</h5>
        <h6>The general forecast for today is: ${forecast}</h6>
        <h6>Humidity is at: ${humidity}% for the day.</h6>
    `;
};
