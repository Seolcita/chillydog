import axios from 'axios';

import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import UserContext from '../../context/user.context';

export interface SigninSuccessGetServerSideProps {
  accessToken: string | null;
}

export const SigninSuccess = ({
  accessToken,
}: SigninSuccessGetServerSideProps) => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  if (typeof window !== 'undefined' && accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
  }

  useEffect(() => {
    (async () => {
      accessToken &&
        (await axios
          .post(`${process.env.END_POINT_URL}/auth/profile`, {
            accessToken,
          })
          .then((res) => {
            console.log('res🥎🥎🥎🥎🥎🥎🥎🥎🥎', res.data);
            setUser(res.data);
            router.push(`/main?userId=${res.data.id}`);
          })
          .catch((error) => {
            console.error('Fail to fetch profile', error);
          }));
    })();
  }, []);
};

export default SigninSuccess;

export async function getServerSideProps() {
  let accessToken;
  await axios
    .get(`${process.env.END_POINT_URL}/auth/token`)
    .then((res) => {
      accessToken = res.data.token.accessToken;
      console.log('🥎🥎🥎🥎🥎🥎🥎🥎🥎accessToken', accessToken);
    })
    .catch((error) => {
      console.error('Fail to get token:', error);
    });

  return {
    props: { accessToken },
  };
}
