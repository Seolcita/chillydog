import { ReactElement } from 'react';
import MainPage from './main';
import Login from '../components/Login/Login';

//TODO: It is placeholder. It will be replaced
const Home = (): ReactElement => {
  return <Login />;
};

export default Home;
//TODO:
// If user is logged in redirect to /user/:id
// If user is not logged in redirect to /login
