/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  FormValues,
  LocationForm,
} from '../../components/Screens/Location/LocationForm';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

export const LocationScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const router = useRouter();
  const { user } = useContext(UserContext);
  const dogId = router.query.dogId;
  const question = `Q. Which city is your dog living?`;

  const onSubmit = async ({ cityName }: FormValues) => {
    if (user && cityName) {
      await axios
        .post('http://localhost:3001/api/dog/location', {
          dogId,
          location: cityName,
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
        setErrorMessage('Location value not found. Please try again.');
      }
    }
  };

  return (
    <Questionnaire
      currentStep={5}
      question={question}
      form={<LocationForm onSubmit={onSubmit} />}
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(LocationScreen);
