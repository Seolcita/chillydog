import { ReactElement, useState } from 'react';
import { WeatherData, fetchWeatherData } from '../../hooks/use-weather';
import { Typography } from 'sk-storybook';

import * as S from './WeatherCard.styles';
import * as s from '../common-styles';
import { DeviceType } from '../../hooks/use-window-resize';

interface WeatherCardProps {
  deviceType: DeviceType;
}

interface ConvertTempUnit {
  temp: number;
  unit: string;
}

export enum WeatherType {
  THUNDERSTORM = 'THUNDERSTORM',
  DRIZZLE = 'DRIZZLE',
  RAIN = 'RAIN',
  SNOW = 'SNOW',
  CLEAR = 'CLEAR',
  CLOUD = 'CLOUD',
  OTHERS = 'OTHERS',
}

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

const WeatherImageUrlMap: Record<WeatherType, string> = {
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

export const WeatherCard = ({ deviceType }: WeatherCardProps): ReactElement => {
  const isMobile = deviceType === DeviceType.MOBILE;
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const city = 'calgary';

  (async function loadWeatherData() {
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  })();

  const weatherType = weatherData && getWeatherType(weatherData.weatherId);

  const convertTempUnit = ({ temp, unit }: ConvertTempUnit) => {
    const options = {
      style: 'unit',
      unit,
    };

    let temperature;
    if (unit === 'fahrenheit') {
      temperature = ((temp * 9) / 5 + 32).toFixed(0);
    } else {
      temperature = temp.toFixed(0);
    }
    const locale = navigator.language;
    const formattedTemp =
      weatherData &&
      new Intl.NumberFormat(locale, options).format(+temperature);
    return formattedTemp;
  };

  return (
    <>
      {weatherData && weatherType ? (
        <S.Container tabIndex={0} aria-label='Weather display card'>
          <s.Visibility $isVisible={isMobile}>
            <Typography variant='headingS' color='white' aria-label='city'>
              {weatherData.city}
            </Typography>
          </s.Visibility>
          <S.ImageContainer tabIndex={0} aria-label='Weather Image'>
            {<iframe src={WeatherImageUrlMap[weatherType]} />}
          </S.ImageContainer>
          <S.TextContainer>
            <s.Visibility $isVisible={!isMobile}>
              <Typography variant='textM' color='white' aria-label='city'>
                {weatherData.city}
              </Typography>
            </s.Visibility>
            <S.Temperature>
              {/* TODO: Set user's preferred temp unit then display with the unit. default is Celsius */}
              <Typography
                variant='headingM'
                fontWeight='bold'
                color='white'
                margin={['none', 'md', 'none', 'none']}
                aria-label='temperature in celsius'
              >
                {convertTempUnit({
                  temp: weatherData.temperature,
                  unit: 'celsius',
                })}
              </Typography>
              <Typography
                variant='headingXS'
                color='white'
                aria-label='temperature in fahrenheit'
              >
                {convertTempUnit({
                  temp: weatherData.temperature,
                  unit: 'fahrenheit',
                })}
              </Typography>
            </S.Temperature>
            <Typography
              variant='textL'
              color='white'
              aria-label='weather description'
            >
              {weatherData.description}
            </Typography>
          </S.TextContainer>
        </S.Container>
      ) : (
        // TODO: updated loading once it is available from storybook
        <div>Loading</div>
      )}
    </>
  );
};
