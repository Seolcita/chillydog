import { ReactElement, useContext, useEffect, useState } from 'react';
import { Typography } from 'sk-storybook';

import * as S from './WeatherCard.styles';
import * as s from '../common-styles';
import { DeviceType } from '../../hooks/use-window-resize';
import axios from 'axios';
import {
  ConvertTempUnit,
  WeatherData,
  WeatherType,
} from '../../entities/weather.entities';
import { WeatherImageUrlMap, getWeatherType } from '../../hooks/use-weather';
import UserContext from '../../context/user.context';

interface WeatherCardProps {
  deviceType: DeviceType;
  weatherData: WeatherData;
  weatherType: WeatherType;
}

export const WeatherCard = ({
  deviceType,
  weatherData,
  weatherType,
}: WeatherCardProps): ReactElement => {
  const isMobile = deviceType === DeviceType.MOBILE;

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
