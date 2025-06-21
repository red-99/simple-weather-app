document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "";

  weatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (!city) return; //empty string means false value

    try {
      const Weather = await fetchData(city);
      displayData(Weather);
    } catch (error) {
      showError();
    }
    cityInput.value = "";
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(response);
    // console.log(typeof response)

    if (!response.ok) {
      throw new Error("City not found");
      // showError();
    }

    const fetchedData = await response.json();
    return fetchedData;
  }

  function displayData(weatherData) {
    // weatherData.main
    // console.log(weatherData.main.temp)
    const { name, main, weather } = weatherData;
    cityName.textContent = name;
    temperature.textContent = `Temperature: ${main.temp}°C`;
    description.textContent = `Weather Description: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
