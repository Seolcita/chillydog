import { DogSize } from '../entities/dog.entities';
import { WeatherType } from '../entities/weather.entities';

export interface Factors {
  dogSize: DogSize;
  coldAdapt: boolean;
  heavyCoat: boolean;
  weatherType: WeatherType;
  temp: number;
  humidity: number;
}

export interface Result {
  title: string;
  description: string;
  point: number;
}

export const useResult = ({
  dogSize,
  coldAdapt,
  heavyCoat,
  weatherType,
  temp,
  humidity,
}: Factors): Result => {
  const coldAdaptPoint = coldAdapt ? -1 : 0;
  const heavyCoatPoint = heavyCoat ? -1 : 0;
  const isWetWeather =
    weatherType === WeatherType.RAIN ||
    weatherType === WeatherType.SNOW ||
    weatherType === WeatherType.THUNDERSTORM ||
    weatherType === WeatherType.DRIZZLE ||
    weatherType === WeatherType.OTHERS ||
    humidity > 60;
  const wetWeatherPoint = isWetWeather ? 2 : 0;

  let weatherAndSizePoint = 0;

  // weather & size
  if (dogSize === DogSize.SMALL) {
    // -5°C or below -5°C
    if (temp <= -5) {
      weatherAndSizePoint = 5;
      // between -4°C and -2°C
    } else if (temp >= -4 && temp <= -2) {
      weatherAndSizePoint = 4;
      // between -1°C and 6°C
    } else if (temp >= -1 && temp <= 6) {
      weatherAndSizePoint = 3;
      // between 7°C and 11°C
    } else if (temp >= 7 && temp <= 11) {
      weatherAndSizePoint = 2;
      // 12°C or over 12°C
    } else if (temp >= 12) {
      weatherAndSizePoint = 1;
    }
  } else if (dogSize === DogSize.MEDIUM) {
    // -10°C or below -10°C
    if (temp <= -10) {
      weatherAndSizePoint = 5;
      // between -2°C and -9°C
    } else if (temp >= -9 && temp <= -2) {
      weatherAndSizePoint = 4;
      // between -1°C and 6°C
    } else if (temp >= -1 && temp <= 6) {
      weatherAndSizePoint = 3;
      // between 7°C and 9°C
    } else if (temp >= 7 && temp <= 9) {
      weatherAndSizePoint = 2;
      // 10°C or over 10°C
    } else if (temp >= 10) {
      weatherAndSizePoint = 1;
    }
  } else if (dogSize === DogSize.LARGE) {
    // -10°C or below -10°C
    if (temp <= -10) {
      weatherAndSizePoint = 5;
      // between -9°C and -5°C
    } else if (temp >= -9 && temp <= -5) {
      weatherAndSizePoint = 4;
      // between -6°C and 3°C
    } else if (temp >= -6 && temp <= 3) {
      weatherAndSizePoint = 3;
      // between 4°C and 6°C
    } else if (temp >= 4 && temp <= 6) {
      weatherAndSizePoint = 2;
      // 7°C or over 7°C
    } else if (temp >= 7) {
      weatherAndSizePoint = 1;
    }
  }

  const result = (point: number): Result => {
    if (point <= 1) {
      return {
        title: 'No evidence of risk',
        description: 'Have fun outside!',
        point: 1,
      };
    } else if (point === 2) {
      return {
        title: 'Risk is unlikely',
        description: 'Have fun outside, but be careful!',
        point,
      };
    } else if (point === 3) {
      return {
        title: 'Unsafe potential, depending on breed',
        description: 'Keep an eye on your pet outdoors',
        point,
      };
    } else if (point === 4) {
      return {
        title: 'Dangerous weather is developing',
        description: 'Use caution',
        point,
      };
    } else if (point >= 5) {
      return {
        title: 'Potentially life-threatening cold',
        description: 'Avoid prolonged outdoor activity',
        point: 5,
      };
    } else {
      throw Error('error');
    }
  };

  const totalPoints =
    coldAdaptPoint + heavyCoatPoint + wetWeatherPoint + weatherAndSizePoint;

  return result(totalPoints);
};
