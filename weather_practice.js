const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
function renderWeatherInfo(data)
{
    let para =  document.createElement('p');
    para.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    document.body.appendChild(para);
}
async function showWeather()
{
    try
    {
        let lat = 15.3333;
        let lon = 74.0833;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        console.log("data : ", data);
        // let para =  document.createElement('p');
        // para.textContent = `${data?.main?.temp.toFixed(2)} °C`;
        // document.body.appendChild(para);
        renderWeatherInfo(data);
    }
    catch(err){
        console.log("failed");
    }
}
showWeather();

function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else    
        console.log("location access denied");
}
function showPosition(position)
{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
}


// const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);



