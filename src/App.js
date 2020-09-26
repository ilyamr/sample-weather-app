import React, { useState } from 'react';
import './App.css';

import useLocalStorage from './utils/useLocalStorage.js';
import { fetchWeather } from './api/fetchWeather';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  // const [city, setCity] = useLocalStorage('city', 'Berlin');

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`
  }

  return (
    <div className="main-container">
    <input type="text"className="search"placeholder="Search..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
    {weather.main && (
        <div className="city">
            <h2 className="city-name">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
            </h2>
                <div className="date">{dateBuilder(new Date())}</div>
            <div className="city-temp">
                {Math.round(weather.main.temp)}
                <sup>&deg;C</sup>
            </div>
            <div className="info">
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p>{weather.weather[0].description}</p>
            </div>
            <div className="info">
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        </div>
    )}
</div>
  );
}

export default App;
