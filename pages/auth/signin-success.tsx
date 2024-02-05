import axios from 'axios';

import { useRouter } from 'next/router';

export interface SigninSuccessGetServerSideProps {
  accessToken: string | null;
}

export const SigninSuccess = ({
  accessToken,
}: SigninSuccessGetServerSideProps) => {
  const router = useRouter();

  const getProfile = async (accessToken: string) => {
    await axios
      .post(`${process.env.END_POINT_URL}/auth/profile`, {
        accessToken,
      })
      .then((res) => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('email', res.data.email);
        }

        window.location.href = `/main?userId=${res.data.id}`;
      })
      .catch((error) => {
        console.error('Fail to fetch profile', error);
      });
  };

  if (typeof window !== 'undefined' && accessToken) {
    sessionStorage.setItem('accessToken', accessToken);

    getProfile(accessToken);
  }
};

export default SigninSuccess;

export async function getServerSideProps() {
  let accessToken;
  await axios
    .get(`${process.env.END_POINT_URL}/auth/token`)
    .then((res) => {
      accessToken = res.data.token.accessToken;
    })
    .catch((error) => {
      console.error('Fail to get token:', error);
    });

  return {
    props: { accessToken },
  };
}
