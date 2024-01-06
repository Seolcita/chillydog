import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { LocationForm } from '../../components/Screens/Location/LocationForm';

export const LocationScreen = (): ReactElement => {
  const question = `Q. Which city is your dog living?`;

  return (
    <Questionnaire
      currentStep={5}
      question={question}
      form={<LocationForm />}
    />
  );
};

export default LocationScreen;
