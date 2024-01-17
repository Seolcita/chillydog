import Main from '../components/Screens/Main/Main';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../context/user.context';

const Home = () => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useContext(UserContext);

  if (!isLoading) {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else if (isAuthenticated && user) {
      router.push(`/main?userId=${user.id}`);
    }
  }
};

export default Home;
