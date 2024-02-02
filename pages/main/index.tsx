/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import withAuth from '../../components/HOC/withAuth';
import UserContext from '../../context/user.context';
import Main from '../../components/Screens/Main/Main';
import { Loader } from '../../components/LineLoader/LineLoader';

const MainPage = (): ReactElement => {
  const { setUser, isLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async (accessToken: string) => {
      await axios
        .get(`${process.env.END_POINT_URL}/auth/login-status`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };

    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken');

      if (accessToken) {
        fetchUserProfile(accessToken);
      }
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Chilly Dog</title>
        <meta
          name='description'
          content='The application displays the current weather and provides guidance on whether the conditions are too cold for a user&#39;s dog, tailored to the dog&#39;s profile. It also features a display of in-progress dog profiles. This functionality assists dog owners in making informed decisions about their pets&#39; well-being in varying weather conditions, while also managing their pets&#39; profile information.'
        />
      </Head>
      <Main />
    </>
  );
};

export default withAuth(MainPage);
export { MainPage };
