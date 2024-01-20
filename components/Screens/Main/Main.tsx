/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useEffect, useState } from 'react';
import { WeatherCard } from '../../WeatherCard/WeatherCard';
import { LineLoader } from 'sk-storybook';
import axios from 'axios';

import { CreateDogProfile } from '../../CreateDogProfileCard/CreateDogProfileCard';
import { InprogressCards } from '../../InprogressCards/InprogressCards';
import { useWindowSize } from '../../../hooks/use-window-resize';
import { WeatherData } from '../../../entities/weather.entities';
import { getWeatherType } from '../../../hooks/use-weather';
import { ResultCards } from '../../ResultCard/ResultCards';
import UserContext from '../../../context/user.context';
import { Dog } from '../../../entities/dog.entities';
import { FlexCenter } from '../../common-styles';
import * as S from './main.style';

const Main = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();

  const { deviceType } = useWindowSize();
  const { user, isLoading } = useContext(UserContext);

  const weatherType = weatherData && getWeatherType(weatherData.weatherId);
  const hasDogs = user?.dogs !== undefined && user.dogs.length > 0;
  const hasWeatherInfo = weatherData && weatherType;
  const city = user?.location ?? null;

  const loadWeatherData = async () => {
    if (!city) {
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3001/api/weather?city=${city}`
      );
      const data: WeatherData = res.data;
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    loadWeatherData();
    const intervalId = setInterval(loadWeatherData, 300000);
    return () => clearInterval(intervalId);
  }, [city, weatherData?.city]);

  return (
    <>
      {isLoading ? (
        <FlexCenter>
          <LineLoader />
        </FlexCenter>
      ) : !hasDogs ? (
        <CreateDogProfile />
      ) : (
        <S.Wrapper>
          <S.MainLayout>
            <S.WeatherSection>
              {user?.location && hasWeatherInfo && (
                <WeatherCard
                  deviceType={deviceType}
                  weatherData={weatherData}
                  weatherType={weatherType}
                />
              )}
            </S.WeatherSection>
            <S.CardsContainer>
              {hasDogs && hasWeatherInfo && (
                <S.CardsSection>
                  <ResultCards
                    dogs={user.dogs as Dog[]}
                    weatherData={weatherData}
                    weatherType={weatherType}
                  />
                </S.CardsSection>
              )}

              {hasDogs && (
                <S.CardsSection>
                  <InprogressCards
                    dogs={user.dogs as Dog[]}
                    deviceType={deviceType}
                  />
                </S.CardsSection>
              )}
            </S.CardsContainer>
          </S.MainLayout>
        </S.Wrapper>
      )}
    </>
  );
};

export default Main;
export { Main };
