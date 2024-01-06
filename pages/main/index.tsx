/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useEffect } from 'react';

import Main from '../../components/Screens/Main/Main';
import UserContext from '../../context/user.context';
import axios from 'axios';
import { User } from '../../entities/user.entities';

interface MainPageGetServerSideProps {
  user: User;
}

const MainPage = ({ user }: MainPageGetServerSideProps): ReactElement => {
  const { setUser } = useContext(UserContext);

  if (user) {
    setUser(user);
  }

  return <Main />;
};

export default MainPage;
export { MainPage };

// TODO: set getServerSideProps
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
      console.log('res ⭐️', res.data);
      userData = res.data;
    })
    .catch((error) => {
      console.error('An error occurred:', error); //TODO: Handle error - Toast message
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
