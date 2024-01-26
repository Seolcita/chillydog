/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import axios from 'axios';

import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import UserContext from '../../context/user.context';
import Login from '../../components/Login/Login';

export const Signout = (): ReactElement => {
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  (async () => {
    await axios
      .post(`${process.env.END_POINT_URL}/auth/logout`)
      .then((res) => {
        res.data.LoggedOut && setIsLogout(true);
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

    setUser(null);
  }

  return (
    <>
      {isLogout ? (
        <Login />
      ) : (
        <ErrorCard
          redirectUrl={`/auth/signout`}
          message='Something went wrong! Please try again.'
          buttonText='Sign Out'
        />
      )}
    </>
  );
};

export default Signout;
