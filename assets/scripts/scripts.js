var key = "fc9370f26192d02c666de9df21b1cac5";
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
    // console.log(response);
    $("#city-name").text(response.name);
    $("#country-name").text(response.sys.country);
    $("#date").text(moment().format("l"));
    $("#temp").text(kToF(response.main.temp));
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind.speed);
    $("#wind-degrees").text(response.wind.deg);
    getForecastAndUV(response);
    // addToList(response.name);

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


function addToList(cityName) {

}

function getLocationList() {

}

function getForecastAndUV(response) {
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}&exclude=hourly,minutely`
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

function pushOneCallForecast(forecast) {
    $("#forecast").empty()
    for (const i in forecast){
        makeDayCard(forecast[i]);
    }
}

function makeDayCard(day){
    let dayCard = $("<div>").addClass("card bg-primary");
    let cardBody = $("<div>").addClass("card-body");
    let date = $("<h5>").addClass("card-title");
    date.text(moment.unix(day.dt).format("l"));

    let temp = $("<p>").text(`Temp: ${kToF(parseInt(day.temp.day))}°F`).addClass("card-text");

    let humidity = $("<p>").text(`Humidity: ${day.humidity}%`).addClass("card-text");

    cardBody.append(date, temp, humidity);
    dayCard.append(cardBody);
    dayCard.appendTo($("#forecast"));
}

function pushOneCallUV(uvi) {
    $("#uvi").text(uvi);
    //INSERT CODE TO CHANGE COLOR HERE
}


$("#search-button").on("click", function (event) {
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    // console.log(cityName);
    getWeather(cityName);
})