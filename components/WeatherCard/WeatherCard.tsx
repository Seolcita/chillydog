import { ReactElement } from 'react';
import { Spinner, Typography } from 'sk-storybook';

import { WeatherImageUrlMap } from '../../hooks/use-weather';
import { DeviceType } from '../../hooks/use-window-resize';
import { Loader } from '../LineLoader/LineLoader';
import * as S from './WeatherCard.styles';
import * as s from '../common-styles';
import {
  ConvertTempUnit,
  WeatherData,
  WeatherType,
} from '../../entities/weather.entities';

interface WeatherCardProps {
  deviceType: DeviceType;
  weatherData: WeatherData;
  weatherType: WeatherType;
  isWeatherDataLoading?: boolean;
}

export const WeatherCard = ({
  deviceType,
  weatherData,
  weatherType,
  isWeatherDataLoading,
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

  if (!weatherData || !weatherType) {
    return <Loader />;
  }

  return (
    <S.Container tabIndex={0} aria-label='Weather display card'>
      <s.Visibility $isVisible={!isMobile} tabIndex={0}>
        <Typography
          variant='headingS'
          color='white'
          aria-label='city'
          fontWeight='bold'
        >
          {isWeatherDataLoading ? <Spinner size='sm' /> : weatherData.city}
        </Typography>
      </s.Visibility>
      <S.ImageContainer
        tabIndex={0}
        aria-label={`${weatherType} Weather Image`}
      >
        <S.LottieContainer>{WeatherImageUrlMap[weatherType]}</S.LottieContainer>
      </S.ImageContainer>
      <S.TextContainer tabIndex={0}>
        <s.Visibility $isVisible={isMobile}>
          <Typography
            variant='headingXS'
            color='white'
            aria-label='city'
            fontWeight='bold'
          >
            {isWeatherDataLoading ? <Spinner /> : weatherData.city}
          </Typography>
        </s.Visibility>
        <S.Temperature>
          {/* TODO: Set user's preferred temp unit then display with the unit. default is Celsius */}
          {isWeatherDataLoading ? (
            <Spinner size='md' />
          ) : (
            <>
              <Typography
                variant='headingM'
                fontWeight='bold'
                color='white'
                margin={['none', 'lg', 'none', 'none']}
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
            </>
          )}
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
  );
};
