/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';
import Head from 'next/head';

import useFetchUserProfile from '../../hooks/use-fetch-user-profile';
import useFetchWeatherData from '../../hooks/use-fetch-weather-data';
import Main from '../../components/Screens/Main/Main';
import withAuth from '../../components/HOC/withAuth';

const MainPage = (): ReactElement => {
  useFetchUserProfile();

  const { weatherData, isWeatherDataLoading } = useFetchWeatherData();

  return (
    <>
      <Head>
        <title>Chilly Dog</title>
        <meta
          name='description'
          content='The application displays the current weather and provides guidance on whether the conditions are too cold for a user&#39;s dog, tailored to the dog&#39;s profile. It also features a display of in-progress dog profiles. This functionality assists dog owners in making informed decisions about their pets&#39; well-being in varying weather conditions, while also managing their pets&#39; profile information.'
        />
      </Head>
      <Main
        weatherData={weatherData}
        isWeatherDataLoading={isWeatherDataLoading}
      />
    </>
  );
};

export default withAuth(MainPage);
export { MainPage };
