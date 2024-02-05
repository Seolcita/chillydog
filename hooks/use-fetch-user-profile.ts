import { useContext, useEffect } from 'react';
import axios from 'axios';

import UserContext from '../context/user.context';
import { useRouter } from 'next/router';

interface UseFetchUserProfileProps {
  isReload?: boolean;
}

const useFetchUserProfile = ({
  isReload = true,
}: UseFetchUserProfileProps = {}) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const fetchUserProfile = async (accessToken: string, email: string) => {
    await axios
      .get(`${process.env.END_POINT_URL}/auth/login-status`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          email,
        },
      })
      .then((res) => {
        if (res.data.user.email !== email) {
          router.push('/auth/signout?authorized=false');
        }
        setUser(res.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    if (user && !isReload) {
      return;
    }

    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken');
      const email = sessionStorage.getItem('email');

      if (accessToken && email) {
        fetchUserProfile(accessToken, email);
      }
    }
  }, []);
};

export default useFetchUserProfile;
