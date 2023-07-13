//__________________________________________Weather API Config__________________________________________//

async function getWeather(city){
    const api: string = 'a04e68b564fb4838931192929231107';
    const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    return data;
}

const searchBtn = document.querySelector('.search-btn');
const searchInput: any = document.querySelector('.search-input');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = searchInput.value;
    getWeather(city).then(data => {
        console.log(data);
        const weather = document.querySelector('.weather');
        const weatherData = `
        <div class="weather__city">
            <h2 class="weather__city-name">${data.location.name}</h2>
            <div class="weather__city-date">${data.location.localtime}</div>
        </div>
        <div class="weather__info">
            <div class="weather__temp">${data.current.temp_c}°C</div>
            <div class="weather__desc">${data.current.condition.text}</div>

        </div>
        <div class="weather__icon">
            <img src="${data.current.condition.icon}" alt="">
        </div>
        `;
        weather.innerHTML = weatherData;
    })
    .catch(() => {
        const weather = document.querySelector('.weather');
        weather.innerHTML = `<h2 class="weather__city-name">Please enter a valid city</h2>`;
    })
})



//___________________________________________________________________________________//

