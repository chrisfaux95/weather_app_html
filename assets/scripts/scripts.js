var key = "fc9370f26192d02c666de9df21b1cac5";
var lsKey = "cities";

var defaultList = ["Washington D.C."]
var cityList;

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
    addToList(response.name);

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


function getForecastAndUV(response) {
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${key}&exclude=hourly,minutely`
    // console.log(queryURL);
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
    for (let i = 1; i < 6; i++) {
        makeDayCard(forecast[i]);
    }
}

function makeDayCard(day) {
    let dayCard = $("<div>").addClass("card bg-primary");
    let cardBody = $("<div>").addClass("card-body");
    let date = $("<h5>").addClass("card-title");
    date.text(moment.unix(day.dt).format("l"));

    let temp = $("<p>").text(`Temp: ${kToF(parseInt(day.temp.day))}°F`).addClass("card-text");

    let humidity = $("<p>").text(`Humidity: ${day.humidity}%`).addClass("card-text");

    cardBody.append(date, $("<hr>"), temp, humidity);
    dayCard.append(cardBody);
    dayCard.appendTo($("#forecast"));
}

function pushOneCallUV(uvi) {
    let uviSpan = $("#uvi");
    uviSpan.text(uvi);
    let bgc = "background-color"
    //INSERT CODE TO CHANGE COLOR HERE
    if (uvi >= 0 && uvi < 3) {
        //if uv index is low:
        uviSpan.css({
            "background-color": "green",
            color: "black"
        });
    } else if (uvi >= 3 && uvi < 6) {
        uviSpan.css({
            "background-color": "yellow",
            color: "black"
        });
    } else if (uvi >= 6 && uvi < 8) {
        uviSpan.css({
            "background-color": "orange",
            color: "black"
        });
    } else if (uvi >= 8 && uvi < 11) {
        uviSpan.css({
            "background-color": "red",
            color: "black"
        })
    } else {
        uviSpan.css({
            "background-color": "purple",
            color: "white"
        });
    }
}

function initList() {
    getList();
    if (cityList === null) {
        cityList = []
        cityList.push("Washington D.C.");
        saveList();

    }
    getWeather(cityList[cityList.length - 1])
    pushList();
}

function getList() {
    cityList = JSON.parse(localStorage.getItem(lsKey));
}

function saveList() {

    localStorage.setItem(lsKey, JSON.stringify(cityList));
    // console.log(cityList);
}

function addToList(cityName) {

    if (!cityList.includes(cityName)) {
        cityList.push(cityName);
    }
    saveList();
    pushList();
}

function pushList() {

    $("#locales").empty()
    cityList.forEach(element => {
        let cityItem = $("<btn>").text(element);
        // cityItem.attr("href", "#");
        cityItem.attr("data-city", element);
        cityItem.addClass("list-group-item list-group-item-action list-group-item-primary");
        $("#locales").prepend(cityItem);
    })

}

function pushToEndOfList(element) {

}



$("#search-button").on("click", function (event) {
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    // console.log(cityName);
    getWeather(cityName);
});

$(document).on("click", ".list-group-item", getWeatherBtn);

function getWeatherBtn() {
    let cityName = $(this).attr("data-city");
    getWeather(cityName);
}

$(document).ready(x => {
    initList();
})
