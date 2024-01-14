import { ReactElement } from 'react';
import { Completion } from '../../components/Screens/Completion/Completion';
import withAuth from '../../components/HOC/withAuth';
const CompleteScreen = (): ReactElement => {
  return <Completion />;
};

export default withAuth(CompleteScreen);
