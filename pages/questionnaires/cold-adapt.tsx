import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { ColdAdaptForm } from '../../components/Screens/ColdAdapt/ColdAdaptForm';
import { GetServerSideProps } from 'next';

const ColdAdaptScreen = (): ReactElement => {
  const question = `Q. Is your dog acclimated to cold?`;

  return (
    <Questionnaire
      currentStep={4}
      question={question}
      form={<ColdAdaptForm />}
    />
  );
};

export default ColdAdaptScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
