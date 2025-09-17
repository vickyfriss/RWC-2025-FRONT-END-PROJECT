// src/api/weatherApi.js

const API_KEY = 'cec7b3dfcb844b5783f190332251709'; // replace with your key
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getCurrentWeather(city) {
  try {
    const res = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return {
      city: data.location.name,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      wind: data.current.wind_kph
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}

export async function getForecastWeather(city, date) {
  try {
    const res = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&dt=${date}`);
    if (!res.ok) throw new Error('Failed to fetch forecast');
    const data = await res.json();
    // WeatherAPI returns forecast per hour
    return data.forecast.forecastday[0].hour; 
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return [];
  }
}
