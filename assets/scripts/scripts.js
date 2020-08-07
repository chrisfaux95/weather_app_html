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

