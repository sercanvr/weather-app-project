const apikey = '52de9b508b9f3eb19936146a0fc6036c';
const cityBtn = document.querySelector('.cityBtn');
const form = document.getElementById('form');
const city = document.getElementById('city');
const weatherDiv = document.getElementById('weather');
const iconDiv = document.getElementById('icon');
const temperatureDiv = document.getElementById('temperature');
const descriptionDiv = document.getElementById('description');
const detailsDiv = document.getElementById('details');

form.addEventListener('submit', (e) => {
    e.preventDefault();
     const cityValue = city.value;
     getWeather(cityValue);
});

async function getWeather(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        const data = await response.json();
        console.log(data);

        const temparature = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const details = [
            `It Feels: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind: ${data.wind.speed}m/s`,
        ];

        iconDiv.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        temperatureDiv.textContent = `${temparature}°C`;

        let detailsNew = details.map((detail) => `<div>${detail}</div>`).join('');
        console.log(detailsNew);
        descriptionDiv.textContent = '';

        detailsDiv.innerHTML = detailsNew;
    } catch (error) {
        iconDiv.innerHTML = '';
        temperatureDiv.textContent = '';
        descriptionDiv.textContent = 'Please Enter a Valid City!';
        detailsDiv.innerHTML = '';
    }
};