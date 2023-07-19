const userTab = document.querySelector(".button1");
const searchTab = document.querySelector(".button2");
const userContainer = document.querySelector(".weather-container");
const grantContainer =  document.querySelector(".grant-access");
const loadingContainer = document.querySelector(".loading-container");
const formContainer = document.querySelector("[data-searchForm]");
const yourWeather = document.querySelector(".your-weather");
const grantButton = document.querySelector(".ga-button");
const searchCity = document.querySelector("[data-searchCity]");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let currentTab = userTab;
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=currentTab)
    {
        let prevTab = currentTab;
        currentTab = clickedTab;
        prevTab.classList.remove("current-tab");
        currentTab.classList.add("current-tab");

        if(!formContainer.classList.contains("active"))
        {
            grantContainer.classList.remove("active");
            yourWeather.classList.remove("active");
            formContainer.classList.add("active");
        }
        else
        {
            formContainer.classList.remove("active");
            yourWeather.classList.remove("active");
            getfromSessionStorage();
        }
    } 
}
userTab.addEventListener("click",() =>{
    switchTab(userTab);
})
searchTab.addEventListener("click",() =>{
    switchTab(searchTab);
})

function getfromSessionStorage()
{
    const localCoordinate = sessionStorage.getItem("user-coordinate");
    if(!localCoordinate)
        grantContainer.classList.add("active");
    else
    {
        const coordinates = JSON.parse(localCoordinate);  //converts json string to object
        fetchUserWeatherInfo(coordiantes);
    }
}

async function fetchUserWeatherInfo(coordinates)
{
    const {lat,lon} = coordinates;
    grantContainer.classList.remove("active");
    loadingContainer.classList.add("active");
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let data = await response.json();  //returns JSON object
        loadingContainer.classList.remove("active");
        yourWeather.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err)
    {
        loadingContainer.classList.remove("active");
        console.log("failed to fetch data " , err);
    }
}

function renderWeatherInfo(weatherInfo)
{
    const cityName = document.querySelector(".yw-name");
    const countryIcon = document.querySelector(".yw-country");
    const type = document.querySelector(".yw-type");
    const weatherIcon = document.querySelector(".yw-img");
    const temp = document.querySelector(".yw-temp");
    const windspeed = document.querySelector(".yw-speed-ws");
    const humidity = document.querySelector(".yw-speed-h");
    const clouds = document.querySelector(".yw-speed-c");
    console.log(weatherInfo);
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    type.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText =`${weatherInfo?.main?.humidity}%`;
    clouds.innerText = `${weatherInfo?.clouds?.all}%`;
}



function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No geolocation support available");
    }
}
function showPosition(position){
    const userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

grantButton.addEventListener("click",getLocation);

formContainer.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchCity.value;
    if(cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
})
async function fetchSearchWeatherInfo(cityName)
{
    loadingContainer.classList.add("active");
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        console.log(data);
        loadingContainer.classList.remove("active");
        yourWeather.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err)
    {
        loadingContainer.classList.remove("active");
        console.log(err);
        alert("Failed to load data");
    }

}