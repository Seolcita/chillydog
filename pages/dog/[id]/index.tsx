import { ReactElement, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';
import withAuth from '../../../components/HOC/withAuth';

export const DogProfilePage = (): ReactElement => {
  const router = useRouter();

  const dogId = router.query.id;

  return <DogProfile dogId={dogId as string} />;
};

export default withAuth(DogProfilePage);
