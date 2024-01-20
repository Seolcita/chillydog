import { ReactElement, ReactNode } from 'react';
import { WeatherType } from '../entities/weather.entities';
import Lottie from 'lottie-react';

export const getWeatherType = (weatherId: number): WeatherType => {
  if (200 <= weatherId && weatherId < 300) {
    return WeatherType.THUNDERSTORM;
  } else if (300 <= weatherId && weatherId < 400) {
    return WeatherType.DRIZZLE;
  } else if (500 <= weatherId && weatherId < 600) {
    return WeatherType.RAIN;
  } else if (600 <= weatherId && weatherId < 700) {
    return WeatherType.SNOW;
  } else if (800 === weatherId) {
    return WeatherType.CLEAR;
  } else if (801 <= weatherId) {
    return WeatherType.CLOUD;
  } else {
    return WeatherType.OTHERS;
  }
};

import ThunderstormAnimation from '../assets/weather/thunderstorm.json';
import DrizzleAnimation from '../assets/weather/drizzle.json';
import RainAnimation from '../assets/weather/rain.json';
import SnowAnimation from '../assets/weather/snow.json';
import ClearAnimation from '../assets/weather/clear.json';
import CloudAnimation from '../assets/weather/cloud.json';
import OthersAnimation from '../assets/weather/others.json';

export const WeatherImageUrlMap: Record<WeatherType, ReactElement> = {
  [WeatherType.THUNDERSTORM]: <Lottie animationData={ThunderstormAnimation} />,
  [WeatherType.DRIZZLE]: <Lottie animationData={DrizzleAnimation} />,
  [WeatherType.RAIN]: <Lottie animationData={RainAnimation} />,
  [WeatherType.SNOW]: <Lottie animationData={SnowAnimation} />,
  [WeatherType.CLEAR]: <Lottie animationData={ClearAnimation} />,
  [WeatherType.CLOUD]: <Lottie animationData={CloudAnimation} />,
  [WeatherType.OTHERS]: <Lottie animationData={OthersAnimation} />,
};
