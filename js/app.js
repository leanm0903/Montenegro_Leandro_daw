async function getLocation($event) {
    var city = document.getElementById('location').value;
    getCity(city);
}

async function getCity(city) {
        var data = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + city + '&count=1');

    if(data.ok){
        var result = await data.json();
         if (result.results == undefined){
            const msj = document.getElementById('msj');
            msj.append("no encontramos la ciudad")
         }

        var lat = result.results[0].latitude;
        var lon = result.results[0].longitude;
        document.getElementById('city').innerText = result.results[0].name;
        await getWeather(lat, lon);
    }else{
        var error= document.getElementById("error-message");
         error.setAttribute("class", "active")
    }
}


async function getWeather(lat, lon) {  
    var data = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true');
    if (data.ok) {
        var result = await data.json();
        document.getElementById('temperature').textContent = result.current_weather.temperature + '°C';
        document.getElementById('windspeed').textContent = result.current_weather.windspeed + ' km/h';
        document.getElementById('weathercode').textContent = result.current_weather.weathercode;
    }
    else{
         var error= document.getElementById("error-message");
         error.setAttribute("class", "active");
         error.append("Errror")

    }
 }

