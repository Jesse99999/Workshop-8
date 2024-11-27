// Excercise 1
var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
var data = JSON.parse(text);

var jsonDiv = document.getElementById("jsondata");

// Näytetään vain nimet
function displayNames() {
jsonDiv.innerHTML = ""; // Tyhjennetään
data.employees.forEach(employee => {
jsonDiv.innerHTML += `<p>${employee.firstName} ${employee.lastName}</p>`;
});
}

// Näytetään kaikki data
function displayAllData() {
jsonDiv.innerHTML = ""; // Tyhjennetään
jsonDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

document.querySelectorAll("button")[0].addEventListener("click", displayNames);
document.querySelectorAll("button")[1].addEventListener("click", displayAllData);





// Excercise 2



var rawDataDiv = document.getElementById("rawdata");

// Lataa raakadata
function loadRawData() {
    fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750")
        .then(response => response.json())
        .then(data => {
            rawDataDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(err => console.error(err));
}

// Lataa ja parsitaan data taulukoksi
function loadAndParseData() {
    fetch("http://www.omdbapi.com/?s=star+wars&apikey=cbbc6750")
        .then(response => response.json())
        .then(data => {
            const movies = data.Search;
            let table = `<table border="1">
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Poster</th>
                </tr>`;
            movies.forEach(movie => {
                table += `
                <tr>
                    <td>${movie.Title}</td>
                    <td>${movie.Year}</td>
                    <td><img src="${movie.Poster}" alt="${movie.Title}" width="100"></td>
                </tr>`;
            });
            table += `</table>`;
            rawDataDiv.innerHTML = table;
        })
        .catch(err => console.error(err));
}


document.querySelectorAll("button")[2].addEventListener("click", loadRawData);
document.querySelectorAll("button")[3].addEventListener("click", loadAndParseData);


// Excercise 3


// API-avain ja perus-URL
const apiKey = "ff64c247a136f706923d1ee0d55d71e2";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";


var weatherDiv = document.getElementById("weatherdata");
var citySelect = document.getElementById("city");
var citySearch = document.getElementById("citysearch");


function getWeatherRaw(city) {
    fetch(`${baseUrl}?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            weatherDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(err => console.error(err));
}


function getWeatherParsed(city) {
    fetch(`${baseUrl}?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            weatherDiv.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Clouds: ${data.clouds.all}%</p>
            `;
        })
        .catch(err => console.error(err));
}


citySelect.addEventListener("change", function () {
    const city = citySelect.value;
    getWeatherParsed(city);
});


document.getElementById("search").addEventListener("click", function () {
    const city = citySearch.value.trim();
    if (city) getWeatherParsed(city);
});


document.querySelectorAll("button")[4].addEventListener("click", function () {
    const city = citySelect.value;
    getWeatherRaw(city);
});
