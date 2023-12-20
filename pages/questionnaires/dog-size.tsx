import { ReactElement } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';

const DogSizeScreen = (props: { question: string }): ReactElement => {
  // const question = `Q. What is your dog's size?`;

  return (
    <Questionnaire
      currentStep={2}
      question={props.question}
      form={<DogSizeForm />}
    />
  );
};

export function getStaticProps() {
  return {
    props: {
      question: `Q. What is your dog's size?`,
    },
  };
}

export default DogSizeScreen;
