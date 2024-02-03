/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { WeatherCard } from '../../WeatherCard/WeatherCard';

import { CreateDogProfile } from '../../CreateDogProfileCard/CreateDogProfileCard';
import { InprogressCards } from '../../InprogressCards/InprogressCards';
import { useWindowSize } from '../../../hooks/use-window-resize';
import { WeatherData } from '../../../entities/weather.entities';
import { getWeatherType } from '../../../hooks/use-weather';
import { ResultCards } from '../../ResultCard/ResultCards';
import UserContext from '../../../context/user.context';
import { Dog } from '../../../entities/dog.entities';
import { Loader } from '../../LineLoader/LineLoader';
import * as S from './main.style';

interface MainProps {
  weatherData: WeatherData | null;
}

const Main = ({ weatherData }: MainProps): ReactElement => {
  const { deviceType } = useWindowSize();
  const { user, isLoading, isHidden } = useContext(UserContext);

  const hasDogs = user?.dogs !== undefined && user.dogs.length > 0;
  const weatherType = weatherData && getWeatherType(weatherData.weatherId);
  const hasWeatherData = weatherData !== null;
  const hasWeatherInfo = hasWeatherData && weatherType;

  if (isLoading) {
    return <Loader />;
  }

  if (!hasDogs && !isHidden) {
    return <CreateDogProfile />;
  }

  return (
    <S.Wrapper>
      <S.MainLayout>
        {hasWeatherInfo && (
          <S.WeatherSection>
            <WeatherCard
              deviceType={deviceType}
              weatherData={weatherData}
              weatherType={weatherType}
            />
          </S.WeatherSection>
        )}

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
  );
};

export default Main;
export { Main };
