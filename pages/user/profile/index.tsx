import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { DogProfile } from '../../../components/Screens/DogProfile/DogProfile';
import { UserProfile } from '../../../components/Screens/UserProfile/UserProfile';
import withAuth from '../../../components/HOC/withAuth';

export const UserProfilePage = (): ReactElement => {
  return <UserProfile />;
};

export default withAuth(UserProfilePage);
