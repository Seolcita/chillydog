import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { NameForm } from '../../components/Screens/Name/NameForm';

export const NameScreen = (): ReactElement => {
  const question = `Q. What is your dog's name?`;

  return (
    <>
      <Questionnaire currentStep={3} question={question} form={<NameForm />} />
    </>
  );
};
