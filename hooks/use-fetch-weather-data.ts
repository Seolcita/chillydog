import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { WeatherData } from '../entities/weather.entities';
import UserContext from '../context/user.context';

const useFetchWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);

  const { user } = useContext(UserContext);
  const city = user?.location ?? null;

  const loadWeatherData = async () => {
    if (!city) {
      return;
    }

    setIsWeatherDataLoading(true);

    try {
      const res = await axios.get(
        `${process.env.END_POINT_URL}/weather?city=${city}`
      );
      const data: WeatherData = res.data;
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsWeatherDataLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
    const intervalId = setInterval(loadWeatherData, 300000);
    return () => clearInterval(intervalId);
  }, [city, weatherData?.city]);

  return { weatherData, isWeatherDataLoading };
};

export default useFetchWeatherData;
