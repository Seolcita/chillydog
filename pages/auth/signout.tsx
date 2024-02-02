/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import axios from 'axios';

import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import UserContext from '../../context/user.context';
import Login from '../../components/Login/Login';
import { Notification } from '../../components/Notification/Notification';

export const Signout = (): ReactElement => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const { isLoading, setUser } = useContext(UserContext);

  (async () => {
    await axios
      .post(`${process.env.END_POINT_URL}/auth/logout`)
      .then((res) => {
        res.data.LoggedOut && setIsLogout(true);
        setUser(null);
      })
      .catch((error) => {
        console.error('Fail to logout:', error);
        setIsLogout(false);
      });
  })();

  if (typeof window !== 'undefined' && isLogout) {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      sessionStorage.removeItem('accessToken');
    }
  }

  return (
    <>
      {!isLoading && isLogout && (
        <>
          <Login />
          <Notification message='Logged out successfully.' variant='success' />
        </>
      )}
    </>
  );
};

export default Signout;
