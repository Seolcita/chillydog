import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import UserContext from '../../context/user.context';

const withAuth = (WrappedComponent: NextPage) => {
  const WithAuth: NextPage = (props) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const isAuthenticated = user !== null;

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/auth/signin');
      }
    }, [isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
