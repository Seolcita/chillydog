/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useEffect, useState } from 'react';
import { WeatherCard } from '../../WeatherCard/WeatherCard';
import { useRouter } from 'next/router';
import { Typography } from 'sk-storybook';
import axios from 'axios';

import * as S from './main.style';
import * as s from '../../common-styles';
import ResultCard from '../../ResultCard/ResultCard';
import { DeviceType, useWindowSize } from '../../../hooks/use-window-resize';
import UserContext from '../../../context/user.context';
import { WeatherData } from '../../../entities/weather.entities';
import { useResult } from '../../../hooks/use-result';
import { getWeatherType } from '../../../hooks/use-weather';
import { DogSize } from '../../../entities/dog.entities';

const Main = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  const router = useRouter();
  const { user } = useContext(UserContext);
  const city = user?.location ?? null;

  useEffect(() => {
    if (!city) {
      return;
    }

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
  }, [city]);

  const weatherType = weatherData && getWeatherType(weatherData.weatherId);

  const handleClick = async () => {
    router.push('/questionnaires/name');
  };

  return (
    <S.Wrapper>
      <S.MainLayout>
        <S.ResultSection>
          <s.Visibility $isVisible={!isMobile}>
            <Typography variant='headingM' margin={['none', 'none', 'lg']}>
              Reports
            </Typography>
          </s.Visibility>
          {weatherData &&
          weatherType &&
          user?.dogs !== undefined &&
          user.dogs.length > 0 ? (
            user?.dogs?.map((dog) => {
              const result = useResult({
                dogSize: dog.dogSize as DogSize,
                coldAdapt: dog.coldAdapt,
                heavyCoat: dog.heavyCoat,
                weatherType: weatherType,
                temp: weatherData.temperature,
                humidity: weatherData.humidity,
              });
              return (
                <ResultCard
                  key={dog.id}
                  name={dog.name}
                  result={result}
                  avatarName={dog.avatar.name}
                  deviceType={deviceType}
                />
              );
            })
          ) : (
            <>Add dog</>
          )}
          <div>
            <button onClick={handleClick}>Create a dog profile</button>
          </div>
        </S.ResultSection>
        <S.WeatherSection>
          {user?.location && weatherData && weatherType && (
            <WeatherCard
              deviceType={deviceType}
              weatherData={weatherData}
              weatherType={weatherType}
            />
          )}
        </S.WeatherSection>
      </S.MainLayout>
    </S.Wrapper>
  );
};

export default Main;
export { Main };
