import { ReactElement, useContext, useEffect } from 'react';
import UserContext from '../../context/user.context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from '../../entities/user.entities';

export interface SigninSuccessGetServerSideProps {
  user: User | null;
}

export const SigninSuccess = ({
  user,
}: SigninSuccessGetServerSideProps): ReactElement => {
  const router = useRouter();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    if (user) {
      userCtx.setUser(user);
      router.push(`/main?userId=${user.id}`);
    } else {
      router.push('/auth/signin');
    }
  }, [user, router, userCtx]);

  return <>Loading...</>; //TODO: Add loading spinner
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const cookies = req.headers.cookie;

  const cookiesArray = cookies.split('; ');

  const accessTokenCookie = cookiesArray.find((cookie: string) =>
    cookie.startsWith('access_token=')
  );

  try {
    return axios
      .get(`http://localhost:3001/api/auth/profile`, {
        headers: {
          Cookie: accessTokenCookie,
        },
      })
      .then((res) => {
        console.log('res', res.data);

        return {
          props: {
            user: res.data || null,
          },
        };
      });
  } catch (error) {
    console.error('API request failed', error);
    return { props: { user: null } };
  }
}

export default SigninSuccess;
