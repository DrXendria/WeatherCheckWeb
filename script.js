const apiKey= '9a1216cfd80add3ea85831d69e3f1bc5';
const form= document.getElementById('form');
const city= document.getElementById('city');
const weatherDiv= document.getElementById('weather');
const iconDiv= document.getElementById('icon');
const temperatureDiv= document.getElementById('temperature');
const descriptionDiv= document.getElementById('description');
const detailsDiv= document.getElementById('details');




form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const cityValue= city.value;
    getWeather(cityValue);
});


async function getWeather(cityValue){

    try {
        const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        const data= await res.json();

        console.log(data);

        const temperature = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const details=[
            `Feels Like:${Math.round(data.main.feels_like)}`,
            `Humidity Rate:${data.main.humidity}%`,
            `Wind:${data.wind.speed} m/s`
        ];
        iconDiv.innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png"
        alt="Weather Icon">`;
        temperatureDiv.textContent=`${temperature}°C`;

        let allDetails=details.map((detail)=>`<div>
            ${detail}
        </div>`).join('');
        detailsDiv.innerHTML=allDetails;
        descriptionDiv.textContent=``;
    } catch (error) {
        iconDiv.innerHTML=``;
        temperatureDiv.textContent=``;
        descriptionDiv.textContent=`Please enter a valid city name.`;
        detailsDiv.innerHTML=``;
    }
    
}