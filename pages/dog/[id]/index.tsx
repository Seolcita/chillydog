import { ReactElement, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';
import { ErrorCard } from '../../../components/ErrorCard/ErrorCard';
import withAuth from '../../../components/HOC/withAuth';
import UserContext from '../../../context/user.context';

export const DogProfilePage = (): ReactElement => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const dogId = router.query.id;

  if (!dogId) {
    return <ErrorCard redirectUrl={`/main?userId=${user?.id}`} />;
  }

  return <DogProfile dogId={dogId} />;
};

export default withAuth(DogProfilePage);
