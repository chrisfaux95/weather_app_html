var key = "fc9370f26192d02c666de9df21b1cac5"

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
    $("#temp").text(kToF(response.main.temp));
    $("#humidity").text(response.main.humidity);
    $("#wind-speed").text(response.wind.speed);
    $("#wind-degrees").text(response.wind.deg);

}

function kToF(temp) {
    return ((temp * (9 / 5)) - 459.67).toFixed(2);
}


$("#search-button").on("click", function(event){
    event.preventDefault();
    let cityName = $("#search-input").val().trim();
    // console.log(cityName);
    getWeather(cityName);
})