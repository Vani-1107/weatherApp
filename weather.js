const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");



let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
           
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
           
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    
    switchTab(searchTab);
});

function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {

        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        console.log("insde session storage ");
    console.log(coordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    
    grantAccessContainer.classList.remove("active");

    loadingScreen.classList.add("active");

  
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
      

    }

}

function renderWeatherInfo(weatherInfo) {


    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);


    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        body.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log("insde show position");
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
         
    }

    console.log(userCoordinates);
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    
   
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        alert("failed to fetch information");
    }
}



// const userTab = document.querySelector(".button1");
// const searchTab = document.querySelector(".button2");
// const userContainer = document.querySelector(".weather-container");
// const grantContainer =  document.querySelector(".grant-access");
// const loadingContainer = document.querySelector(".loading-container");
// const formContainer = document.querySelector("[data-searchForm]");
// const yourWeather = document.querySelector(".your-weather");
// const grantButton = document.querySelector(".ga-button");
// const searchCity = document.querySelector("[data-searchCity]");

// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// let currentTab = userTab;
// currentTab.classList.add("current-tab");
// getfromSessionStorage();

// function switchTab(clickedTab)
// {
//     if(clickedTab!=currentTab)
//     {
//         let prevTab = currentTab;
//         currentTab = clickedTab;
//         prevTab.classList.remove("current-tab");
//         currentTab.classList.add("current-tab");
//         if(!formContainer.classList.contains("active"))
//         {
//             grantContainer.classList.remove("active");
//             yourWeather.classList.remove("active");
//             formContainer.classList.add("active");
//         }
//         else
//         {
//             formContainer.classList.remove("active");
//             yourWeather.classList.remove("active");
//             getfromSessionStorage();
//         }
//     } 
// }
// userTab.addEventListener("click",() =>{
//     switchTab(userTab);
// })
// searchTab.addEventListener("click",() =>{
//     switchTab(searchTab);
// })

// function getfromSessionStorage()
// {
//     const localCoordinate = sessionStorage.getItem("user-coordinate");
//     if(!localCoordinate)
//         grantContainer.classList.add("active");
//     else
//     {
//         const coordinates = JSON.parse(localCoordinate);  //converts json string to object
//         fetchUserWeatherInfo(coordiantes);
//     }
// }

// async function fetchUserWeatherInfo(coordinates)
// {
//     const {lat,lon} = coordinates;
//     grantContainer.classList.remove("active");
//     loadingContainer.classList.add("active");
//     try{
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         let data = await response.json();  //returns JSON object
//         loadingContainer.classList.remove("active");
//         yourWeather.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(err)
//     {
//         loadingContainer.classList.remove("active");
//         console.log("failed to fetch data " , err);
//     }
// }

// function renderWeatherInfo(weatherInfo)
// {
//     const cityName = document.querySelector(".yw-name");
//     const countryIcon = document.querySelector(".yw-country");
//     const type = document.querySelector(".yw-type");
//     const weatherIcon = document.querySelector(".yw-img");
//     const temp = document.querySelector(".yw-temp");
//     const windspeed = document.querySelector(".yw-speed-ws");
//     const humidity = document.querySelector(".yw-speed-h");
//     const clouds = document.querySelector(".yw-speed-c");
//     console.log(weatherInfo);
//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     type.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = `${weatherInfo?.main?.temp} °C`;
//     windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
//     humidity.innerText =`${weatherInfo?.main?.humidity}%`;
//     clouds.innerText = `${weatherInfo?.clouds?.all}%`;
// }

// function getLocation(){
//     if(navigator.geolocation)
//     {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         alert("No geolocation support available");
//     }
// }
// function showPosition(position){
//     const userCoordinates = {
//         lat : position.coords.latitude,
//         lon : position.coords.longitude
//     };
//     sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
//     fetchUserWeatherInfo(userCoordinates);
// }

// grantButton.addEventListener("click",getLocation);

// formContainer.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     let cityName = searchCity.value;
//     if(cityName === "")
//         return;
//     else
//         fetchSearchWeatherInfo(cityName);
// })
// async function fetchSearchWeatherInfo(cityName)
// {
//     loadingContainer.classList.add("active");
//     try{
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
//         let data = await response.json();
//         console.log(data);
//         loadingContainer.classList.remove("active");
//         yourWeather.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(err)
//     {
//         loadingContainer.classList.remove("active");
//         console.log(err);
//         alert("Failed to load data");
//     }
// }