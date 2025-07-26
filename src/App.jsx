import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'e124065ec97cfcd91eb3a5ff07dcd972';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchWeather = () => {
    if (location.trim() === '') return;

    setLoading(true);
    setError('');
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError('');
      })
      .catch(() => {
        setError('City not found. Please try again.');
        setData({});
      })
      .finally(() => {
        setLoading(false);
        setLocation('');
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter location"
          type="text"
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data.name && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>
                {data.name}
                {data.sys ? `, ${data.sys.country}` : ''}
              </p>
            </div>

            {data.weather && (
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="icon"
                className="weather-icon"
              />
            )}

            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>

            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

            {data.main && (
              <div className="minmax">
                <p>Min: {data.main.temp_min.toFixed()}°C</p>
                <p>Max: {data.main.temp_max.toFixed()}°C</p>
              </div>
            )}

            {data.sys && (
              <div className="sunrise-sunset">
                <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
