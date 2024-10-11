// Use await any time a Promise is returned (promises are returned w fetch, .json(), async func)
import './styles.css';
import str from '../storage';


async function sendRequest(location) {

    const query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const queryFahr = `${query}${location}?unitGroup=us&key=${str}&contentType=json`;
    const queryCel = `${query}${location}?unitGroup=metric&key=${str}&contentType=json`;

    try {

        const responseFahr = await fetch(`${queryFahr}`, { mode: 'cors' });
        if (!responseFahr.ok) {
            throw new Error(`Response status: ${responseFahr.status}`);
        }

        const responseCel = await fetch(`${queryCel}`, { mode: 'cors' });
        const dataFahr = await responseFahr.json();
        const dataCel = await responseCel.json();
        return [dataFahr, dataCel];

    } catch (error) {

        console.error(error);
        alert('Location not found. Please try again.');
    }
}


const domHandler = (function () {

    const form = document.querySelector('#weather');
    const changeBtn = document.querySelector('#changeDeg');
    let weatherData;

    const displayData = (data) => {
        const table = document.querySelector('#table');
        const caption = document.querySelector('#caption');
        const conditions = document.querySelector('#conditions');
        const currentTemp = document.querySelector('#currentTemp');
        const feelsLike = document.querySelector('#feelsLike');
        const minTemp = document.querySelector('#minTemp');
        const maxTemp = document.querySelector('#maxTemp');

        caption.textContent = data.resolvedAddress;
        conditions.textContent = data.currentConditions.conditions;
        currentTemp.textContent = data.currentConditions.temp;
        feelsLike.textContent = data.currentConditions.feelslike;
        minTemp.textContent = data.days[0].tempmin;
        maxTemp.textContent = data.days[0].tempmax;

        table.style.display = 'block';
    };


    form.addEventListener('submit', async (e) => {
        const input = Object.fromEntries(new FormData(form));
        e.preventDefault();
        const data = await sendRequest(input.location);
        if (data) {
            weatherData = data;
            displayData(weatherData[0]);
            changeBtn.style.display = 'block';
            changeBtn.value = 'f';
            changeBtn.textContent = 'Change to Celsius';
        }
    });


    changeBtn.addEventListener('click', () => {
        if (changeBtn.value === 'f') {
            displayData(weatherData[1]);
            changeBtn.value = 'c';
            changeBtn.textContent = 'Change to Fahrenheit';
        } else {
            displayData(weatherData[0]);
            changeBtn.value = 'f';
            changeBtn.textContent = 'Change to Celsius';
        }
    });

}());

