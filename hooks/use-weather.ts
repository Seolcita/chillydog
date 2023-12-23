export type WeatherData = {
  weather: string;
  weatherId: number;
  description: string;
  temperature: number;
  humidity: number;
  city: string;
};

export const fetchWeatherData = async (
  cityName: string
): Promise<WeatherData> => {
  const response = await fetch('http://localhost:3000/api/weather/city', {
    method: 'POST',
    body: JSON.stringify(cityName),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()).data;

  const weatherData: WeatherData = {
    weather: data.weather[0].main,
    weatherId: data.weather[0].id,
    description: data.weather[0].description,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    city: data.name,
  };

  return weatherData;
};
