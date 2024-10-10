// Use await any time a Promise is returned (promises are returned w fetch, .json())

import str from '../storage';


async function sendRequest(location) {

    let query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    query += `${location}?key=${str}&contentType=json`;

    try {

        const response = await fetch(`${query}`, { mode: 'cors' });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {

        console.error(error.message);
        alert('Invalid location. Please try again.');

    }
}


const domHandler = (function () {

    const form = document.querySelector('#weather');
    const changeBtn = document.querySelector('#changeDeg');

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
        const weatherData = await sendRequest(input.location);
        weatherData.then(() => {
            displayData(weatherData);
        });
    });


    changeBtn.addEventListener('click', () => {

    });

}());

