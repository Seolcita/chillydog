/* eslint-disable react-hooks/rules-of-hooks */
import Main from '../../components/Screens/Main/Main';
import withAuth from '../../components/HOC/withAuth';

const MainPage = () => {
  return <Main />;
};

export default withAuth(MainPage);
export { MainPage };
