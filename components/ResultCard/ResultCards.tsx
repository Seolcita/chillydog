/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';
import { Dog } from '../../entities/dog.entities';
import { WeatherData, WeatherType } from '../../entities/weather.entities';
import { RegistrationStatus } from '../../entities/questionnaire.entities';
import { useResult } from '../../hooks/use-result';
import ResultCard from './ResultCard';
import { useWindowSize } from '../../hooks/use-window-resize';

interface ResultCardsProps {
  dogs: Dog[];
  weatherType: WeatherType;
  weatherData: WeatherData;
}

export const ResultCards = ({
  dogs,
  weatherType,
  weatherData,
}: ResultCardsProps): ReactElement => {
  const { deviceType } = useWindowSize();

  return (
    <>
      {dogs
        .filter(
          (dog) => dog.registrationStatus === RegistrationStatus.COMPLETED
        )
        .map((dog) => {
          const result = useResult({
            dogSize: dog.dogSize,
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
        })}
    </>
  );
};
