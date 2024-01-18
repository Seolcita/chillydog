/* eslint-disable react-hooks/rules-of-hooks */
import Main from '../../components/Screens/Main/Main';
import withAuth from '../../components/HOC/withAuth';
import { ReactElement } from 'react';

const MainPage = (): ReactElement => {
  return <Main />;
};

export default withAuth(MainPage);
export { MainPage };
