/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { FormValues, NameForm } from '../../components/Screens/Name/NameForm';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

const NameScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const question = `Q. What is your dog's name?`;

  const onSubmit = async ({ name }: FormValues) => {
    if (user && name) {
      await axios
        .post('http://localhost:3001/api/dog/name', {
          name,
          userId: user.id,
        })
        .then((res) => {
          const dog: Dog = res.data;
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch((error) => {
          setErrorMessage('Oops! Something went wrong. Please try again.');
          console.error('An error occurred:', error);
        });
    } else {
      if (!user) {
        setErrorMessage('User not found. Please login.');
        router.push('/auth/signin');
      } else {
        setErrorMessage('Dog name not found. Please try again.');
      }
    }
  };

  return (
    <Questionnaire
      currentStep={1}
      question={question}
      form={<NameForm onSubmit={onSubmit} />}
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(NameScreen);
