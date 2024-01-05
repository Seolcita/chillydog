import { ReactElement, useEffect, useState } from 'react';
import { Typography } from 'sk-storybook';

import * as S from './WeatherCard.styles';
import * as s from '../common-styles';
import { DeviceType } from '../../hooks/use-window-resize';
import axios from 'axios';
import { ConvertTempUnit, WeatherData } from '../../entities/weather.entities';
import { WeatherImageUrlMap, getWeatherType } from '../../hooks/use-weather';

interface WeatherCardProps {
  deviceType: DeviceType;
}

export const WeatherCard = ({ deviceType }: WeatherCardProps): ReactElement => {
  const isMobile = deviceType === DeviceType.MOBILE;
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const city = 'calgary'; //TODO: replace data from backend

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/weather?city=${city}`
        );
        console.log('res☀️', res);
        const data: WeatherData = res.data;
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    loadWeatherData();

    const intervalId = setInterval(loadWeatherData, 300000);

    return () => clearInterval(intervalId);
  }, []);

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
