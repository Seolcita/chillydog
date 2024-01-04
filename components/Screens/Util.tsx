import { ReactElement } from 'react';
import { Questionnaire } from '../Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';

export const Utill = (): ReactElement => {
  const question = `Q. What is your dog's size?`;
  return (
    <Questionnaire currentStep={2} question={question} form={<DogSizeForm />} />
  );
};
