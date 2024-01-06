/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { WeatherCard } from '../../WeatherCard/WeatherCard';
import * as S from './main.style';
import ResultCard from '../../ResultCard/ResultCard';
import { Typography } from 'sk-storybook';
import { DeviceType, useWindowSize } from '../../../hooks/use-window-resize';
import * as s from '../../common-styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import UserContext from '../../../context/user.context';
import { User } from '../../../entities/user.entities';

const Main = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  // MOCK Data TODO: use data from BE once it is ready.
  // const name = 'Cookie';
  // const result = {
  //   title: 'Unsafe potential, depending on breed',
  //   description: 'Keep an eye on your pet outdoors',
  //   point: 3,
  // };
  // const avatarName = 'borderCollie';
  const router = useRouter();
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
          {/* <ResultCard
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
          /> */}
          <div>
            <button onClick={handleClick}>Create a dog profile</button>
          </div>
        </S.ResultSection>
        <S.WeatherSection>
          <WeatherCard deviceType={deviceType} />
        </S.WeatherSection>
      </S.MainLayout>
    </S.Wrapper>
  );
};

export default Main;
export { Main };

// export async function getServerSideProps(context: any) {
//   const { user, setUser } = useContext(UserContext);

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/auth/signin',
//         permanent: false,
//       },
//     };
//   }

//   console.log('USER 🥎');
//   try {
//     const res = await axios
//       .get(`http://localhost:3001/api/user?userId=${user.id}`)
//       .then((res) => {
//         console.log('res ⭐️', res.data);
//         setUser(res.data);
//       });

//     return { props: {} };
//   } catch (error) {
//     console.log('error 🚨', error);
//     return { props: {} };
//   }
// }
