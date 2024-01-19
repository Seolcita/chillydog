/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import axios from 'axios';

import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import UserContext from '../../context/user.context';
import Login from '../../components/Login/Login';

export interface SignoutSuccessGetServerSideProps {
  status: number;
}

export const Signout = ({
  status,
}: SignoutSuccessGetServerSideProps): ReactElement => {
  const { setUser } = useContext(UserContext);

  setUser(null);

  if (typeof window !== 'undefined') {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      sessionStorage.removeItem('accessToken');
    }
  }

  return (
    <>
      {status === 200 ? (
        <Login />
      ) : (
        <ErrorCard
          redirectUrl='/auth/signin'
          message='Seems like you are already logout.'
          buttonText='Go to Login Page'
        />
      )}
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { req } = context;

  const cookies = req.headers.cookie;

  const cookiesArray = cookies.split('; ');

  const refreshTokenCookie = cookiesArray.find((cookie: string) =>
    cookie.startsWith('refresh_token=')
  );

  return axios
    .get(`http://localhost:3001/api/auth/logout`, {
      headers: {
        Cookie: refreshTokenCookie,
      },
    })
    .then((res) => {
      return {
        props: res.status === 200 && { status: res.status },
      };
    })
    .catch((error) => {
      console.error('Fail to logout:', error);
      return { props: { status: 500 } };
    });
}

export default Signout;
