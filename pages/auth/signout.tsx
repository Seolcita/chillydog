/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import axios from 'axios';

import UserContext from '../../context/user.context';
import Login from '../../components/Login/Login';
import { Notification } from '../../components/Notification/Notification';
import { useRouter } from 'next/router';

export const Signout = (): ReactElement => {
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const { isLoading, setUser } = useContext(UserContext);
  const router = useRouter();
  const { authorized } = router.query;
  console.log('authorized:', authorized);
  const isAuthorized = authorized === 'false' ? false : true;

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
    const email = sessionStorage.getItem('email');

    if (accessToken && email) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
    }
  }

  return (
    <>
      {!isLoading && isLogout && (
        <>
          <Login />
          {isAuthorized ? (
            <Notification
              message='Logged out successfully.'
              variant='success'
            />
          ) : (
            <Notification
              message='Not authorized. Please sign in.'
              variant='error'
            />
          )}
        </>
      )}
    </>
  );
};

export default Signout;
