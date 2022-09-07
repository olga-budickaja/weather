class DataWeather {

    constructor(linkId) {
        this.linkId = linkId;
        this.link = `https://api.openweathermap.org/data/2.5/weather?id=${this.linkId}&units=metric&cnt=3&appid=bf35cac91880cb98375230fb443a116f`
    }

    data() {
        fetch(this.link)
                   .then(function (response) {
                       return response.json();
                   })
                   .then(function (data) {
                        dateWeather.innerHTML = convertDate(data.dt);
                        dayNightWeather.innerHTML = dayNight(data.main.temp_max, data.main.temp_min);
                        tempWeather.innerHTML = `${Math.round(data.main.temp)}°C`;
                        feelWeather.innerHTML = `It feels like ${Math.round(data.main.feels_like)}°`;
                        iconWeather.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="Weather icon">`;
                        titleIconWeather.innerHTML = data.weather[0]['description'];
                        windWeather.innerHTML = `Wind speed ${data.wind.speed}m.s.`;
                        sunriseWeather.innerHTML = convertTime(data.sys.sunrise, data.sys.sunset);
                        if (data.weather[0]['description'] === 'clear sky'
                            || data.weather[0]['description'] === 'few clouds'
                            || data.weather[0]['description'] === 'scattered clouds'
                            || data.weather[0]['description'] === 'broken clouds'
                            || data.weather[0]['description'] === 'mist'
                            || data.weather[0]['description'] === 'overcast clouds'
                            || data.weather[0]['description'] === 'scattered cloud'
                            && data.main.temp >= 10) {
                            background.classList.toggle("summer");
                            body.classList.toggle("body-summer");
                        } else if (data.weather[0]['description'] === 'clear sky'
                            || data.weather[0]['description'] === 'few clouds'
                            || data.weather[0]['description'] === 'scattered clouds'
                            || data.weather[0]['description'] === 'mist'
                            && data.main.temp < 10) {
                            background.classList.toggle("winter");
                            body.classList.toggle("body-winter");
                        } else if (
                            data.weather[0]['description'] === 'shower rain'
                            || data.weather[0]['description'] === 'rain'
                            || data.weather[0]['description'] === 'thunderstorm') {
                            background.classList.toggle("rain");
                            body.classList.toggle("body-rain");
                        } else if (data.weather[0]['description'] === 'snow') {
                            background.classList.toggle("snow");
                            body.classList.toggle("body-snow");
                        } else if (
                            data.dt <= data.sys.sunset
                            && data.main.temp <= 10)  {
                            background.classList.toggle("summer-night");
                            body.classList.toggle("body-summer-night");
                        } else if (
                            data.dt <= data.sys.sunset
                            && data.main.temp > 10
                        ) {
                            background.classList.toggle("winter-night");
                            body.classList.toggle("body-winter-night");
                        }
                   });
    }

}

function convertDate(e) {
    let date = new Date(e * 1e3).toISOString().slice(0, 10);
    let day = date.slice(8, 10);
    let month = new Date().toLocaleString('default', { month: 'long' });
    let year = date.slice(0, 4);

    return `${day} ${month} ${year}`;
}

function dayNight(max, min) {
    return `Day ${Math.round(max)}°<span class="weather-data__part-days-arrow weather-data__part-days-max">↑</span> • Night ${Math.round(min)}°<span class="weather-data__part-days-arrow weather-data__part-days-min">↓</span>`;
}

function convertTime(sunrise, sunset) {
    sunrise = new Date(sunrise * 1000).toISOString().slice(11, 16);
    sunset = new Date(sunset * 1000).toISOString().slice(11, 16)
    return `Sunrise ${sunrise} • Sunset ${sunset}`;
}

const dateWeather = document.querySelector(".weather-data__date");
const dayNightWeather = document.querySelector(".weather-data__part-days");
const tempWeather = document.querySelector(".weather-data__temperature-temp");
const feelWeather = document.querySelector(".weather-data__feeling");
const iconWeather = document.querySelector(".weather-image__icon");
const titleIconWeather = document.querySelector(".weather-image__title");
const windWeather = document.querySelector(".weather-data__wind");
const sunriseWeather = document.querySelector(".weather-data__sunrise");
const tabsWeather = document.querySelectorAll(".weather-data__tabs-item");
const background = document.querySelector(".container");
const body = document.querySelector("body");

let idCities = [703448, 2643743, 5128638];

for (let i = 0; i < tabsWeather.length; i++) {
    tabsWeather[i].addEventListener('click', (event) => {
        event. preventDefault();
        let build = new DataWeather(idCities[i]);
        build.data();
        tabsWeather[i].classList.add("active");
    });
}





