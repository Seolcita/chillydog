import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../context/user.context';

const Home = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else if (isAuthenticated && user) {
      router.push(`/main?userId=${user.id}`);
    }
  }, [isAuthenticated, user, router]);
};

export default Home;
