import { LocationWeather, LocationWeatherUS } from '../models/LocationWeather';

export function isWeatherUS(
  weather: LocationWeather | LocationWeatherUS
): weather is LocationWeatherUS {
  return weather.weatherDetails.hasOwnProperty('Weather');
}

export function mapWeather(
  weather: LocationWeather | LocationWeatherUS
): LocationWeather {
  if (!isWeatherUS(weather)) {
    return weather;
  }

  return {
    city: weather.city,
    country: weather.country,
    weatherDetails: weather.weatherDetails.Weather.map((dailyWeather) => {
      return {
        date: dailyWeather.date,
        type: dailyWeather.type,
        averageTemperature: dailyWeather.average_temperature,
      };
    }),
  };
}
