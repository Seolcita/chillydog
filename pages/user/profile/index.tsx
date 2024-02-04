import { ReactElement, useEffect, useState } from 'react';

import { UserProfile } from '../../../components/Screens/UserProfile/UserProfile';
import withAuth from '../../../components/HOC/withAuth';
import useFetchUserProfile from '../../../hooks/use-fetch-user-profile';

export const UserProfilePage = (): ReactElement => {
  const [isReload, setIsReload] = useState(false);

  // Incase user refreshes the page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setIsReload(true);
      });

      return () => {
        window.removeEventListener('load', () => {
          setIsReload(true);
        });
      };
    }
  }, []);
  useFetchUserProfile({ isReload });

  return <UserProfile />;
};

export default withAuth(UserProfilePage);
