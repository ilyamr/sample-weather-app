import React, { useState } from 'react';
import { DateTime } from 'luxon';

import 'antd/dist/antd.css';
import { Tabs } from 'antd';

import './App.css';

import { fetchWeather } from './api/fetchWeather';



function App() {

  const DISPLAY_DAYS_NUMBER = 3;

  let [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const { TabPane } = Tabs;

  const URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
  const URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';


  const search = async () => {
      const data = await fetchWeather(URL_WEATHER, query);
      setWeather(data);
      setQuery('');
  }

  const handleEnter = async (evt) => {
    if (evt.key === "Enter") {
      await search();
    }
  }

  const searchForecast = async () => {
    const data = await fetchWeather(URL_FORECAST, query);
    console.log(data);

    
    const res = forecastBuilder(data, DISPLAY_DAYS_NUMBER);
    
    console.log('fcb: ',res);
    setForecast(res);

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

    // console.log('hourlyForecastDates', hourlyForecastDates);
    // console.log('uniqueDays', uniqueDays);

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



  const WeatherTabs = (props) => (
    <React.Fragment>
      {props.forecast.map(x => (
        <div key={x.dayDate}>
          {x.data.toString()}
        </div>
      ))}
    </React.Fragment> 
  );


  return (
    <div className="main-container">
      <h1 className="app-header">Weather app</h1>

      <input type="submit" onClick={searchForecast}/>

      <div className="search-wrapper">
        <input type="text"className="search" placeholder="Search city..." value={query}onChange={(e) => setQuery(e.target.value)} onKeyPress={handleEnter}/>
        <input type="submit" className="search-button" onClick={search} value=""/>
      </div>

{/* 
      <Tabs type="card">
        <TabPane tab="Tab Title 1" key="1">

          <WeatherTabs forecast={forecast}/> */}

            {/* {forecast && forecast.length > 0 && (
              <h1>Test</h1>
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
            )} */}

          {/* {weather.main && (
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
        </TabPane>
        <TabPane tab="Tab Title 2" key="2">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
        <TabPane tab="Tab Title 3" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
      </Tabs> */}




      <Tabs type="card">
        <TabPane tab="Tab Title 1" key="1">
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
        </TabPane>
        <TabPane tab="Tab Title 2" key="2">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
        <TabPane tab="Tab Title 3" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
      </Tabs>

  </div>
  );
}

export default App;
