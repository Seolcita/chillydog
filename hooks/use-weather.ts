import { WeatherType } from '../entities/weather.entities';

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

export const WeatherImageUrlMap: Record<WeatherType, string> = {
  [WeatherType.THUNDERSTORM]:
    'https://lottie.host/embed/bd24198d-39f1-4e56-9246-5692d2064550/6T0ZR8biqT.json',
  [WeatherType.DRIZZLE]:
    'https://lottie.host/embed/ce8df61f-56b8-4158-9104-db304083b268/nVkJsQUd3U.json',
  [WeatherType.RAIN]:
    'https://lottie.host/embed/2b947fb0-a2bd-495a-9da0-fa1b9aa307fc/DaCHadF9aE.json',
  [WeatherType.SNOW]:
    'https://lottie.host/embed/15c6b7dd-bb87-4539-9052-1bc4b6d56186/VZfZIpHydO.json',
  [WeatherType.CLEAR]:
    'https://lottie.host/embed/b94b4904-e2ff-4297-9f98-781b47f52e66/jjdLEZod4S.json',
  [WeatherType.CLOUD]:
    'https://lottie.host/embed/06231b9d-5da3-4451-993c-4e0d254c875a/hAjp1TgBdO.json',
  [WeatherType.OTHERS]:
    'https://lottie.host/embed/90377a45-61fd-4f4d-ad0d-bc0ca88a6eb1/py1ZqqSkx0.json',
};
