var lsKey = "cities";

function getWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushWeather(response);
    })
}

function pushWeather(response) {
    console.log(response);
    $("#city-name").text(response.name);
    $("#country-name").text(response.sys.country);
    $("#date").text(moment().format("l"));
    $("#temp").text(kToF(response.main.temp));
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind.speed);
    $("#wind-degrees").text(response.wind.deg);

}

function kToF(temp) {
    return ((temp * (9 / 5)) - 459.67).toFixed(2);
}

function getForecast(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response => {
        pushForecast(response);
    })
}

function pushForecast() { 

}

function getForecastAndUV(response) {
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}`
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(r => {
        pushOneCallForecast(r.daily);
        pushOneCallUV(r.current.uvi);
        // console.log(r);
    });
}

}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    // console.log(cityName);
    getWeather(cityName);
})