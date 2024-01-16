/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';
import { Option } from '../../entities/questionnaire.entities';
import UserContext from '../../context/user.context';
import withAuth from '../../components/HOC/withAuth';
import { Dog } from '../../entities/dog.entities';

const DogSizeScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  const router = useRouter();
  const dogId = router.query.dogId;
  const { user } = useContext(UserContext);
  const question = `Q. What is your dog's size?`;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value) {
      await axios
        .post('http://localhost:3001/api/dog/dog-size', {
          dogId,
          dogSize: value.value,
          userId: user.id,
        })
        .then((res) => {
          setIsSubmitting(false);
          const dog: Dog = res.data;
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage('Oops! Something went wrong. Please try again.');
          console.error('An error occurred:', error);
        });
    } else {
      setIsSubmitting(false);
      console.error('dog size or user is undefined');
    }
  };

  return (
    <Questionnaire
      currentStep={2}
      question={question}
      form={
        <DogSizeForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
          isSubmitting={isSubmitting}
        />
      }
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(DogSizeScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
