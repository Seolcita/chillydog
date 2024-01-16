// import { ReactElement, useContext } from 'react';
// import MainPage from './main';
// import Login from '../components/Login/Login';
// import UserContext from '../context/user.context';
import Main from '../components/Screens/Main/Main';
import withAuth from '../components/HOC/withAuth';

const Home = () => {
  // const { user } = useContext(UserContext);
  // const isLoggedIn = user !== null;

  // if (!isLoggedIn) {
  //   return <Login />;
  // }

  return <Main />;
};

export default withAuth(Home);
