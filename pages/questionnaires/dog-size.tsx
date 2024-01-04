import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';

const DogSizeScreen = (): ReactElement => {
  const question = `Q. What is your dog's size?`;

  return (
    <Questionnaire currentStep={2} question={question} form={<DogSizeForm />} />
  );
};

export default DogSizeScreen;
