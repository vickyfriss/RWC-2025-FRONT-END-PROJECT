const API_KEY = 'cec7b3dfcb844b5783f190332251709'; 
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

  // Determine if date is in the past
  const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const isPast = date < today;

  const endpoint = isPast ? 'history.json' : 'forecast.json';

  try {
    const res = await fetch(
      `${BASE_URL}/${endpoint}?key=${API_KEY}&q=${encodeURIComponent(city)}&dt=${date}`
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();

    // Pick hourly data
    const hours = isPast ? data.forecast.forecastday[0].hour : data.forecast.forecastday[0].hour;

    const forecast = hours.find(
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
    console.error('Error fetching weather:', error);
    return null;
  }
}
