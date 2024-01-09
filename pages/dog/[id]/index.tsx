import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';

export const DogProfilePage = (): ReactElement => {
  const router = useRouter();

  const dogId = router.query.id;

  if (!dogId) {
    return <div>Loading...</div>;
  }
  return <DogProfile dogId={dogId} />;
};

export default DogProfilePage;
