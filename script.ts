//__________________________________________Weather API Config__________________________________________//

async function getWeather(city) {
  const api: string = "a04e68b564fb4838931192929231107";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data;
}

function addWeatherInfo(data) {
  const weather = document.querySelector(".weather");
  const weatherData = `
    <div class="weather">
  <div class="weatherCard">
    <div class="weather__info">
      <div class="weather__temp">${data.current.temp_f}°F</div>
      <div class="weather__desc">${data.current.condition.text}</div>

      <div class="weather__city">
        <h5 class="weather__city-name">${data.location.name}, ${data.location.country}</h5>
        <div class="weather__city-date">${data.location.localtime}</div>
        <p class="feels-like">Feels like ${data.current.feelslike_f}°F</p>
      </div>
    </div>
    <div class="weather-icon">
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" />
    </div>
  </div>
    `;
  weather.innerHTML = weatherData;

  changeBackgroundImg(data);
}

const searchBtn = document.querySelector(".search-btn") as HTMLButtonElement;
const searchInput: any = document.querySelector(".search-bar");
const searchForm = document.querySelector(".search-form") as HTMLFormElement;
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  getWeather(city)
    .then((data) => {
      addWeatherInfo(data);
    })
    .catch(() => {
      const weather = document.querySelector(".weather");
      weather.innerHTML = `<h2 class="weather__city-name">Please enter a valid city</h2>`;
    });
  searchInput.value = "";
});

//_______________________________Change Background Img____________________________________________________//
const sunnyBackground = new Image();
sunnyBackground.src = "/background-img/sun-rising-rock-formation-covered-greenery.jpg";

const cloudySkyBackground = new Image();
cloudySkyBackground.src = "/background-img/clouds-sky-vertical-shot.jpg";

const rainySkyBackground = new Image();
rainySkyBackground.src = "/background-img/weather-effects-composition.jpg";

const snowySkyBackground = new Image();
snowySkyBackground.src = "/background-img/sunbeam-through-snowy-forest.jpg";

const defaultSkyBackground = new Image();
defaultSkyBackground.src = "/background-img/peaceful-meadow-with-trees-distance.jpg";

function changeBackgroundImg(data) {
    //background change
    const body = document.querySelector("body");
    const condition = data.current.condition.text.toLowerCase();
    let backgroundImage: string;

  if (condition.includes("sunny")) {
    backgroundImage = `url(${sunnyBackground.src})`;
  } else if (condition.includes("clouds")) {
    backgroundImage = `url(${cloudySkyBackground.src})`;
  } else if (condition.includes("rain")) {
    backgroundImage = `url(${rainySkyBackground.src})`;
  } else if (condition.includes("snow")) {
    backgroundImage = `url(${snowySkyBackground.src})`;
  } else {
    backgroundImage = `url(${defaultSkyBackground.src})`;
  }
  document.body.style.backgroundImage = backgroundImage;
}