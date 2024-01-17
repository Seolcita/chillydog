import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { NextPage } from 'next';

import UserContext from '../../context/user.context';

const withAuth = (WrappedComponent: NextPage) => {
  const WithAuth: NextPage = (props) => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useContext(UserContext);

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/auth/signin');
      }
    }, [isAuthenticated, isLoading, router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
