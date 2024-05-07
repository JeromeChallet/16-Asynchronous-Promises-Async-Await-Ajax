'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
///////////////////XML HTTP RQUEST////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // url to which we will make the ajax call
  // CORS cross origin ressource sharing
  // 1. open the request
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  // 2. send the request
  request.send();
  request.addEventListener('load', function () {
    console.log('request: ', this);
    // 3. convert the received obj into a JS obj
    const [data] = JSON.parse(this.responseText);
    console.log(data); //use this to study the data you want to use.

    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);
    const html = `
  <article class="country">
 <img class="country__img" src= "${data.flags.svg}">
 <div class="country__data">
   <h3 class="country__name"> ${data.name.official}</h3>
   <h4 class="country__region">${data.region}</h4>
   <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
     1
   )} million</p>         
   <p class="country__row"><span>🗣️</span>${languages[0]}</p>
   <p class="country__row"><span>💰</span>${currencies[0].name}</p>
 </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// Sample countries whose details we want to display.
getCountryData('france');
getCountryData('japan');


///////////////////CALLBACK HELL////////////////////
*/
const renderCountry = function (data, className = '') {
  //COUNTRY PROPERTIES
  const flag = data.flags.svg;
  const countryName = data.name.common;
  const region = data.region;
  const population = (data.population / 1000000).toFixed(2);
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;
  //HTML
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${countryName}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${population} people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currency}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbour = function (country) {
  //ajax call 1 for main country:
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    //NOTE:responseText is actually string in JSON format.Converting js object:
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //render country:
    renderCountry(data);

    //get neighbours:
    const neighbours = data.borders;
    if (!neighbours) return;
    //ajax call 2 for neighbours:
    neighbours.forEach(neighbour => {
      let request2 = new XMLHttpRequest();
      request2.open(
        'GET',
        `https://restcountries.com/v3.1/alpha/${neighbour}
        `
      );
      request2.send();
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);

        //render country:
        renderCountry(data2, 'neighbour');
      });
    });
  });
};

getCountryAndNeighbour('france');
*/
///////////////////PROMISES AND FETCH API////////////////////
/*
const request = fetch('https://restcountries.com/v3.1/name/france');
console.log('request: ', request);

// its arg is the resulting value of the fullfilled promise
const getCountryData = function (country) {
  // 1. the fetch function returns a promise
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // 2. then is what happens once the fetch function is successfull, to handle the successfull promise
    .then(function (response) {
      // 3. in order to be able to read the data of the body(response) we need to call the json method on the response
      console.log('response: ', response);
      // 4. this returns a promise on which we can call the then method again
      return response.json();
    })
    // 5. the results of the fullfilled promise is the data itself we can access thanks to json method
    .then(function (data) {
      console.log('data: ', data);
      renderCountry(data[0]);
    });
};
*/
// using arrow function
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('france');
