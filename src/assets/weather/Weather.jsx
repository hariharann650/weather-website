import React, { useEffect, useState } from 'react'
import './weather.css';
import search from '../icon-search-2.svg';
import sunny_img from '../suny.png';
import humidity_img from '../humidity-6.svg';
import windspeed_img from '../wind-speed-8.svg';


import clearIcon from '../clear.png';
import drizzleIcon from '../drizzleIcon.png';
import rainIcon from '../rain.png';
import snowIcon from '../snow.png';

function Created({img, weatherdigit, area , latitudevalue ,mainweather, longitudevalue ,humidity, windspeed,country}){

  return( 

    <div className="main-content">
      <img className='weather_img' src={img} alt="weather" />
      <div className='weather_digit'>{weatherdigit}°C</div>
      <div className='mainweather'>{mainweather}</div>
      <div className="area">{area}</div>
      <div className="country">{country}</div>
      <div className="direction">
        <div className="latitude">
          <span>Latitude</span>
          <span>{latitudevalue}</span>
        </div>
        <div className="longitude">
          <span>Longitude</span>
          <span>{longitudevalue}</span>
        </div>
      </div>
      <div className="bottom-weather">
        <div className="humidity">
          <img className='hum-img' src={humidity_img} alt="humidity" />
          <div className='data'>{humidity}%</div>
          <div className='windspeed-name'>Humidity</div>
        </div>
        <div className="windspeed">
          <img className='wind-img' src={windspeed_img} alt="windspeed" />
          <div className='data'>{windspeed}Km/h</div>
          <div className='windspeed-name'>Wind Speed</div>
        </div>
      </div>
    </div>
  )
}

const Weather = () => {
  const key = 'b3f1072e98e0ab8e38ccc79c364529ed'
  const[img, setImg] = useState('');
  const[country,setCountry] = useState('')
  const[mainweather, setMainweather]=useState('');
  const[weatherdigit , setWeatherdigit] = useState(0);
  const[area, setArea] = useState('')
  const[latitudevalue, setLatitudevalue] = useState(0)
  const[longitudevalue , setLongitudevalue] = useState(0)
  const[humidity, setHumidity] = useState(0)
  const[windspeed, setWindspeed]= useState(0)
  const[text ,setText] = useState('chennai')
  const[loading , setLoading]=useState(false);
  const[citynotfound, setCitynotfound] = useState(false)
  const[error ,setError] = useState('');

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": clearIcon,
    "02n": clearIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }


    async function searching(){
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}`
      setLoading(true);
      try{
          const ref = await fetch(url);
          const wait = await ref.json();
          if(wait.cod == 404){
            setLoading(false);
            setCitynotfound(true);
            return;
          }
          setCitynotfound(false);
          setHumidity(wait.main.humidity);
          setWindspeed(wait.wind.speed);  
          setLongitudevalue(wait.coord.lon);
          setLatitudevalue(wait.coord.lat);
          setWeatherdigit(Math.floor(wait.main.temp / 10));
          setCountry(wait.sys.country);
          setArea(wait.name);
          setMainweather(wait.weather[0].description);
          const weathericon = wait.weather[0].icon
          setImg(weatherIconMap[weathericon] || clearIcon) 
      }
      catch(e){
        setError(e.message);
      }
      finally{
        setLoading(false);
      }
    }
    const textchanging = (e)=>{
      setText(e.target.value);
    }
    useEffect(()=>{
      searching();
    },[])
  return (
  <div className="main-div">
    <div className="input-div">
      <input type="text" placeholder='Enter City Name' onChange={textchanging} onKeyDown={(e)=>{
        if(e.key == 'Enter'){
          searching();
        }
      }}  />
      <img className='search' onClick={()=>searching()} src={search} alt="" />
    </div>
    {citynotfound && <div className='citynotfound'>City Not Found</div>}
    {loading && <div className='Loading-div'>Loading...</div>}
    {error && <div className='error-div'>Error Is{error}</div>}
    {!citynotfound &&  <Created img={img} weatherdigit={weatherdigit} area={area} country={country} 
     latitudevalue={latitudevalue}  longitudevalue={longitudevalue} humidity={humidity}
      windspeed={windspeed} mainweather={mainweather} />}
    <div className='design'>Designed by <span>Hari</span></div>
  </div>
  )
}

export default Weather;
