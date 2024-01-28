/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useEffect } from 'react';
import axios from 'axios';

import withAuth from '../../components/HOC/withAuth';
import UserContext from '../../context/user.context';
import Main from '../../components/Screens/Main/Main';

const MainPage = (): ReactElement => {
  const { setUser } = useContext(UserContext);

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

  return <Main />;
};

export default withAuth(MainPage);
export { MainPage };
