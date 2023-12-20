import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { HeavyCoatForm } from '../../components/Screens/HeavyCoat/HeavyCoatForm';

const HeavyCoatScreen = (): ReactElement => {
  const question = `Q. Is your dog Northern breed or has your dog heavy coat?`;

  return (
    <>
      <Questionnaire
        currentStep={3}
        question={question}
        form={<HeavyCoatForm />}
      />
    </>
  );
};

export default HeavyCoatScreen;
