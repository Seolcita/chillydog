import { ReactElement, useContext } from 'react';
import MainPage from './main';
import Login from '../components/Login/Login';
import UserContext from '../context/user.context';
import Main from '../components/Screens/Main/Main';

//TODO: It is placeholder. It will be replaced
const Home = () => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user !== null;

  if (!isLoggedIn) {
    return <Login />;
  }

  return <Main />;
};

export default Home;
//TODO:
// If user is logged in redirect to /user/:id
// If user is not logged in redirect to /login
