import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { NameForm } from '../../components/Screens/Name/NameForm';

const NameScreen = (): ReactElement => {
  const question = `Q. What is your dog's name?`;

  return (
    <Questionnaire currentStep={1} question={question} form={<NameForm />} />
  );
};

export default NameScreen;
