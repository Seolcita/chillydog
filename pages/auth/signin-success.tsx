import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import UserContext from '../../context/user.context';
import { User } from '../../entities/user.entities';

export interface SigninSuccessGetServerSideProps {
  user: User | null;
}

export const SigninSuccess = ({ user }: SigninSuccessGetServerSideProps) => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  if (typeof window !== 'undefined' && user) {
    sessionStorage.setItem('accessToken', user.accessToken);
  }

  useEffect(() => {
    if (user === null) {
      router.push('/auth/signin');
    }

    user && router.push(`/main?userId=${user.id}`);
  }, [user, router, setUser]);
};

export async function getServerSideProps(context: any) {
  axios.defaults.withCredentials = true;
  const { req } = context;
  const cookies = req.headers.cookie;
  console.log('COOKIE😅', cookies);

  const cookiesArray = cookies && cookies.split('; ');

  const accessTokenCookie =
    cookiesArray &&
    cookiesArray.find((cookie: string) => cookie.startsWith('access_token='));

  console.log('🥎🥎🥎🥎🥎🥎🥎🥎🥎accessTokenCookie', accessTokenCookie);

  return await axios
    .get(`${process.env.END_POINT_URL}/auth/profile`, {
      withCredentials: true,
      headers: {
        Cookie: accessTokenCookie,
      },
    })
    .then((res) => {
      console.log('res🥎🥎🥎🥎🥎🥎🥎🥎🥎', res.data);
      return {
        props: {
          user: res.data,
        },
      };
    })
    .catch((error) => {
      console.error('Error🤬🤬🤬🤬', error);
      return { props: { user: null } };
    });
}

export default SigninSuccess;
