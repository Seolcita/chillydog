import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';
import withAuth from '../../../components/HOC/withAuth';
import useFetchUserProfile from '../../../hooks/use-fetch-user-profile';

export const DogProfilePage = (): ReactElement => {
  const router = useRouter();

  const dogId = router.query.id;

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

  return <DogProfile dogId={dogId as string} />;
};

export default withAuth(DogProfilePage);
