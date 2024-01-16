import { ReactElement } from 'react';

import { UserProfile } from '../../../components/Screens/UserProfile/UserProfile';
import withAuth from '../../../components/HOC/withAuth';

export const UserProfilePage = (): ReactElement => {
  return <UserProfile />;
};

export default withAuth(UserProfilePage);
