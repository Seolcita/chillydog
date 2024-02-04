import { useContext, useEffect } from 'react';
import axios from 'axios';

import UserContext from '../context/user.context';

interface UseFetchUserProfileProps {
  isReload?: boolean;
}

const useFetchUserProfile = ({
  isReload = true,
}: UseFetchUserProfileProps = {}) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && !isReload) {
      return;
    }

    const fetchUserProfile = async (accessToken: string) => {
      await axios
        .get(`${process.env.END_POINT_URL}/auth/login-status`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };

    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken');

      if (accessToken) {
        fetchUserProfile(accessToken);
      }
    }
  }, []);
};

export default useFetchUserProfile;
