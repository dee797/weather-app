// Use await any time a Promise is returned (promises are returned w fetch, .json())

import str from '../storage';


async function sendRequest(location) {
    let query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    query += `${location}?key=${str}`;

    try {
        const response = await fetch(`${query}`, { mode: 'cors' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return '';
    }
}


const domHandler = (function () {
    const form = document.querySelector('#weather');

    form.addEventListener('submit', (e) => {
        const data = Object.fromEntries(new FormData(form));
        e.preventDefault();
        const weatherData = sendRequest(data.location);
        console.log(weatherData);
    });
}());

