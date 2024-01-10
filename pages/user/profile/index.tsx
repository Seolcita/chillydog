import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';
import { UserProfile } from '../../../components/Screens/UserProfile/UserProfile';

export const UserProfilePage = (): ReactElement => {
  return <UserProfile />;
};

export default UserProfilePage;
