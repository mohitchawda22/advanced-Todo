import React, { useEffect, useState } from 'react'
import { APIKEY } from '../../constants/weatherApi'
import "./weather.scss"

function Weather() {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
       navigator.geolocation.getCurrentPosition(pos=>{
        const lat=pos.coords.latitude
        const lon=pos.coords.longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
        .then(res=>res.json())
        .then(data=>setWeather(data))
        .catch(err=>console.log(err))
       })
    },[])

    console.log(weather);
    

    if (!weather) return <p>loading......</p>

    return (
        <div className='weather-container'>
            <h3>{weather?.name} Weather</h3>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} alt={weather?.weather[0]?.description} />
            <p>{weather?.weather[0]?.description}</p>
            <p>{weather?.main?.temp}°C</p>
        </div>
    )
}

export default Weather
