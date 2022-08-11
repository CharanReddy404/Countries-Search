'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

const getCountryAndNeighbour = function (country) {
    //Ajax call 1
    const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.open('GET, `https://restcountries.com/v3.1/name/${country}?fullText=true`)
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data);
        renderCountry(data);

        const neighbours = data.borders;
        // console.log(neighbours[0]);
        neighbours.forEach(neighbour => {
            if (!neighbours) return;
            //Ajax call for neighbours
            const request2 = new XMLHttpRequest();
            request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
            request2.send();
            request2.addEventListener('load', function () {
                const [data2] = JSON.parse(this.responseText);
                // console.log(data2);
                renderCountry(data2, 'neighbour');
            });
        })

    });
}

const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M peoples</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(', ')}</p>
            <p class="country__row"><span>💰</span>${Object.values(Object.entries(data.currencies)[0][1]).join(' ')}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

submit.addEventListener('click', function () {
    countriesContainer.innerHTML = '';
    const value = search.value;
    console.log(value);
    getCountryAndNeighbour(value);
})

// getCountryAndNeighbour('India');
