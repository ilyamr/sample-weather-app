import React, { useState } from 'react';


import 'antd/dist/antd.css';
import { Tabs } from 'antd';

import './App.css';

import { fetchWeather } from './api/fetchWeather';


function App() {

  const DISPLAY_DAYS_NUMBER = 3;

  let [query, setQuery] = useState('');
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState([]);

  const { TabPane } = Tabs;

  const URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';

  const handleEnter = async (evt) => {
    if (evt.key === "Enter") {
      await searchForecast();
    }
  }

  const searchForecast = async () => {
    const data = await fetchWeather(URL_FORECAST, query);
    
    const res = forecastBuilder(data, DISPLAY_DAYS_NUMBER);
    
    setForecast(res);
    setCity(data.city);

    return data;
}

  const forecastBuilder = (data, maxDays) => {

    let hourlyForecastDates = [];
    let uniqueDays = [];

    //map data per day
    hourlyForecastDates = data.list.map(x => {
      const dayDate = x.dt_txt.split(' ')[0];
      if(uniqueDays.indexOf(dayDate) === -1) {
        uniqueDays.push(dayDate);
      }
       return {
        ...x,
        dayDate
      }
    })

    let res = [];

    for(let i = 0; i < maxDays; i++) {
      res.push( {
        dayDate: uniqueDays[i],
        data: hourlyForecastDates.filter(x => x.dayDate === uniqueDays[i])
      }
      );
    }

    return res;
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
      <h1 className="app-header">Weather app</h1>

      <div className="search-wrapper">
        <input type="text"className="search" placeholder="Search city..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleEnter}/>
        <input type="submit" className="search-button" onClick={searchForecast} value=""/>
      </div>

      <div className="tabs-container"> 

        <Tabs type="card">

        {forecast.map(weather => (
            <TabPane tab={weather.dayDate} key={weather.dayDate}>
              <div className="city city--top">

                <h2 className="city-name">
                    <span>{city.name}</span>
                    <sup>{city.country}</sup>
                </h2>
                    {/* <div className="date">{dateBuilder(new Date())}</div> */}
                <div className="info">
                  <div className="city-info-wrapper">
                    <div className="city-temp">
                        {Math.round(weather.data[0].main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.data[0].weather[0].icon}@2x.png`} alt={weather.data[0].weather[0].description} />
                  </div>
                    <p>{weather.data[0].weather[0].description}</p>
                </div>

              </div>

              <div className="city time-card-wrapper city--bottom" key={weather.dayDate}>

                {weather.data.map(x => (
                  
                  <React.Fragment>

                    <div className="time-card" key={x.dt}>
                      <p className="time-card__time">{ (x.dt_txt.split(' ')[1]).split(':').slice(0, 2).join(':') }</p>
                      <div className="time-card__icon"></div>
                      <div className="info">
                            <img className="city-icon city-icon--small" src={`https://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`} alt={x.weather[0].description} />
                        </div>
                      <p className="time-card__temperature">{Math.round(x.main.temp)} Cº</p>
                      <div className="time-card__wind">{x.wind.speed} m/s</div>
                    </div>
                  </React.Fragment>

                ))}
              </div>

            </TabPane>
        ))}
      </Tabs>
      
      </div>

  </div>
  );
}

export default App;
