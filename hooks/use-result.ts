import { DogSize } from '../components/Screens/DogSize/DogSizeForm';
import { WeatherType } from '../components/WeatherCard/WeatherCard';

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

  const totalPoints =
    coldAdaptPoint + heavyCoatPoint + wetWeatherPoint + weatherAndSizePoint;

  // weather & size
  if (dogSize === DogSize.SMALL) {
    // -6°C or below -6°C
    if (temp <= -6) {
      weatherAndSizePoint = 5;
      // between -2°C and -5°C
    } else if (temp >= -5 && temp <= -2) {
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
  } else if (dogSize === DogSize.MEDIUM) {
    // -12°C or below -12°C
    if (temp <= -12) {
      weatherAndSizePoint = 5;
      // between -4°C and -11°C
    } else if (temp >= -4 && temp <= -11) {
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
    // -12°C or below -12°C
    if (temp <= -12) {
      weatherAndSizePoint = 5;
      // between -11°C and -9°C
    } else if (temp >= -11 && temp <= -9) {
      weatherAndSizePoint = 4;
      // between -8°C and 1°C
    } else if (temp >= -8 && temp <= 1) {
      weatherAndSizePoint = 3;
      // between 0°C and 4°C
    } else if (temp >= 0 && temp <= 4) {
      weatherAndSizePoint = 2;
      // 5°C or over 5°C
    } else if (temp >= 5) {
      weatherAndSizePoint = 1;
    }
  }

  const result = (point: number): Result => {
    if (point === 1) {
      return {
        title: 'No evidence of risk',
        description: 'Have fun outside!',
        point,
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
        title: 'Dangerous weather developing',
        description: 'Use cation',
        point,
      };
    } else if (point === 5) {
      return {
        title: 'Potentially life-threatening cold',
        description: 'Avoid prolonged outdoor activity',
        point,
      };
    } else {
      throw Error('error');
    }
  };

  return result(totalPoints);
};
