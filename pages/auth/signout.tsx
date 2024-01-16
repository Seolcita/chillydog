/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import axios from 'axios';

import UserContext from '../../context/user.context';
import Login from '../../components/Login/Login';
import * as S from '../../components/common-styles';
import { Loader } from '../../components/LineLoader/LineLoader';

export interface SignoutSuccessGetServerSideProps {
  status: number;
}

export const Signout = ({
  status,
}: SignoutSuccessGetServerSideProps): ReactElement => {
  const userCtx = useContext(UserContext);

  if (status === 200) {
    userCtx.setUser(null);
  }

  return (
    <>
      {status === 200 ? (
        <Login />
      ) : (
        <S.FlexCenter>
          <Loader />
        </S.FlexCenter>
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

  try {
    return axios
      .get(`http://localhost:3001/api/auth/logout`, {
        headers: {
          Cookie: refreshTokenCookie,
        },
      })
      .then((res) => {
        console.log('res🧪', res.status);
        return { props: res.status === 200 && { status: res.status } };
      });
  } catch (error) {
    console.error('API request failed', error);
    return { props: { status: 500 } };
  }
}

export default Signout;
