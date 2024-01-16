import Main from '../components/Screens/Main/Main';
import withAuth from '../components/HOC/withAuth';

const Home = () => {
  return <Main />;
};

export default withAuth(Home);
