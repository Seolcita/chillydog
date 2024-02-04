import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { NextPage } from 'next';

import UserContext from '../../context/user.context';

const withAuth = (WrappedComponent: NextPage) => {
  const WithAuth: NextPage = (props) => {
    const router = useRouter();
    const { user, isLoading, isAuthenticated } = useContext(UserContext);
    useEffect(() => {
      const email = sessionStorage.getItem('email');

      if (!isLoading && (!isAuthenticated || user?.email !== email)) {
        router.push('/auth/signout?authorized=false');
      }
    }, [isAuthenticated, isLoading, router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
