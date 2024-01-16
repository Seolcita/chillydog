/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Main from '../../components/Screens/Main/Main';
import UserContext from '../../context/user.context';
import { User } from '../../entities/user.entities';

interface MainPageGetServerSideProps {
  user: User;
}

const MainPage = ({ user }: MainPageGetServerSideProps): ReactElement => {
  const router = useRouter();

  if (user === null) {
    router.push('/auth/signin');
  }

  const { setUser } = useContext(UserContext);
  setUser(user);

  return <Main />;
};

export default MainPage;
export { MainPage };

export async function getServerSideProps(context: any) {
  const { userId } = context.query;

  if (!userId) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  let userData: User | null = null;
  await axios
    .get(`http://localhost:3001/api/user?userId=${userId}`)
    .then((res) => {
      userData = res.data;
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      return {
        props: {
          user: null,
        },
      };
    });

  return {
    props: {
      user: userData,
    },
  };
}
