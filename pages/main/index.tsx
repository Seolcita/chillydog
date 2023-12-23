import { ReactElement } from 'react';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { FlexCenter } from '../../components/common-styles';

const MainPage = (): ReactElement => {
  return (
    //TODO: Set layout
    <FlexCenter>
      <WeatherCard />
    </FlexCenter>
  );
};

export default MainPage;
export { MainPage };
