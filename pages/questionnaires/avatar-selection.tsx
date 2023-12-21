import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { AvatarSelectionForm } from '../../components/Screens/AvatarSelection/AvatarSelectionForm';

const AvatarSelectionScreen = (): ReactElement => {
  const question = `Choose your dog's avatar`;

  return (
    <Questionnaire
      currentStep={5}
      question={question}
      form={<AvatarSelectionForm />}
    />
  );
};

export default AvatarSelectionScreen;
