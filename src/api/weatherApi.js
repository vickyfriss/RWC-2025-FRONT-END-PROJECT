// src/api/weatherApi.js

const API_KEY = 'cec7b3dfcb844b5783f190332251709'; // keep or move to env later
const BASE_URL = 'https://api.weatherapi.com/v1';

// Stadium to City names
function stadiumToCity(location) {
  if (!location) return location;
  const s = location.toString().toLowerCase().trim();

  if (s.includes('allianz')) return 'London';
  if (s.includes('ashton gate')) return 'Bristol';

  return location; // already a city
}

export async function getForecastWeather(cityOrStadium, date, hour) {
  const city = stadiumToCity(cityOrStadium);
  try {
    const res = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&dt=${date}`
    );
    if (!res.ok) throw new Error('Failed to fetch forecast');
    const data = await res.json();

    // Find closest forecast hour
    const forecast = data.forecast.forecastday[0].hour.find(
      h => h.time.includes(`${date} ${hour.toString().padStart(2, '0')}:00`)
    );

    if (!forecast) return null;

    return {
      city: data.location.name,
      temp: forecast.temp_c,
      condition: forecast.condition.text,
      wind: forecast.wind_kph,
      rain: forecast.chance_of_rain
    };
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}
