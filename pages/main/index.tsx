import { ReactElement } from 'react';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import * as S from './main.style';
import ResultCard from '../../components/ResultCard/ResultCard';
import { Typography } from 'sk-storybook';
import { DeviceType, useWindowSize } from '../../hooks/use-window-resize';
import * as s from '../../components/common-styles';

const MainPage = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  // MOCK Data TODO: use data from BE once it is ready.
  const name = 'Cookie';
  const result = {
    title: 'Unsafe potential, depending on breed',
    description: 'Keep an eye on your pet outdoors',
    point: 3,
  };
  const avatarName = 'borderCollie';

  return (
    <S.Wrapper>
      <S.MainLayout>
        <S.ResultSection>
          <s.Visibility $isVisible={!isMobile}>
            <Typography variant='headingM' margin={['none', 'none', 'lg']}>
              Reports
            </Typography>
          </s.Visibility>
          <ResultCard
            name={name}
            result={result}
            avatarName={avatarName}
            deviceType={deviceType}
          />
          <ResultCard
            name={name}
            result={result}
            avatarName={avatarName}
            deviceType={deviceType}
          />
        </S.ResultSection>
        <S.WeatherSection>
          <WeatherCard deviceType={deviceType} />
        </S.WeatherSection>
      </S.MainLayout>
    </S.Wrapper>
  );
};

export default MainPage;
export { MainPage };

//TODO: set getServerSideProps
