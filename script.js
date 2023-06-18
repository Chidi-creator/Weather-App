const locationName = document.querySelector('.location-name')
const temperature = document.querySelector('.num')
const describe = document.querySelector('.description')
const humidityText = document.querySelector('.humidity-text')
const weatherIcon = document.querySelector('.weather-icon')
const speed = document.querySelector('.speed-text')
const timeDisplay = document.querySelector(".time");
const dateDisplay = document.querySelector(".date");
const submitButton = document.querySelector('.submit-button')
const locationInput = document.querySelector('.textbox')
const errorText = document.querySelector('.error')
const modal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");
const currentTime = new Date();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayIndex = currentTime.getDay();
const day = daysOfWeek[dayIndex];
const monthIndex = currentTime.getMonth();
const month = monthsOfYear[monthIndex];
const hours = currentTime.getHours();
const mins = currentTime.getMinutes();
const year = currentTime.getFullYear();
const date = currentTime.getDate();




const weatherMan = async () =>{
    try {
        const res = await fetch('https://api.weatherapi.com/v1/current.json?key=3a4fa662aa3046fdaa284241231206&q=lagos&aqi=yes')
        const data =  await res.json()

        if (!res.ok){
            console.log("Problem")
            return
        }
        locationName.innerHTML = data.location.name
        weatherIcon.src = data.current.condition.icon
        temperature.textContent = data.current.temp_c
        speed.innerHTML = data.current.wind_mph + "mph"
        describe.innerHTML = data.current.condition.text
        humidityText.innerHTML = data.current.humidity + "%"
        timeDisplay.innerHTML = data.location.localtime.slice(-5)
        console.log(data.location.localtime.slice(-5))
    
    } catch (error){
        errorMessage.innerHTML = error;
    modal.style.display = "block";
    }
}

submitButton.addEventListener('click', event =>{
    event.preventDefault()
    if(locationInput.value != ""){
        updateWeatherMan()
        
    }
   else{
    errorMessage.textContent = "Please Fill in the city of your choice";
    modal.style.display = "block";
   }
})

weatherMan()
const clearInput = () =>{
    locationInput.value = null
}

const updateWeatherMan = async () =>{

    try{
        const res =await fetch('https://api.weatherapi.com/v1/current.json?key=3a4fa662aa3046fdaa284241231206&q=' + locationInput.value + '&aqi=yes')
        const data = await res.json()  
        if (!res.ok){
            errorMessage.innerHTML = "An error occured. Please Check your input";
        modal.style.display = "block";
            return
        }
        locationName.innerHTML = data.location.name
        weatherIcon.src = data.current.condition.icon
        temperature.textContent = data.current.temp_c
        speed.innerHTML = data.current.wind_mph + "mph"
        describe.innerHTML = data.current.condition.text
        humidityText.innerHTML = data.current.humidity + "%"
        timeDisplay.innerHTML = data.location.localtime.slice(-5)
        console.log(timeDisplay.innerHTML = data.location.localtime.slice(-5))
    

    }catch(error){
        errorMessage.innerHTML = error;
        modal.style.display = "block";
    }
}

modal.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";
  });

  