/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import {
  FormValues,
  LocationForm,
} from '../../components/Screens/Location/LocationForm';
import { useRouter } from 'next/router';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import axios from 'axios';

export const LocationScreen = (): ReactElement => {
  const question = `Q. Which city is your dog living?`;
  const router = useRouter();
  const { user } = useContext(UserContext);
  const dogId = router.query.dogId;

  const onSubmit = async ({ cityName }: FormValues) => {
    if (user) {
      await axios
        .post('http://localhost:3001/api/dog/location', {
          dogId,
          location: cityName,
          userId: user.id,
        })
        .then((res) => {
          const dog: Dog = res.data;
          console.log('dog', dog);
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch((error) => {
          //TODO: Handle error - Toast message
          console.error('An error occurred:', error);
        });
    } else {
      //TODO: Handle error - Toast message
      console.log('no user');
    }
  };

  return (
    <Questionnaire
      currentStep={5}
      question={question}
      form={<LocationForm onSubmit={onSubmit} />}
    />
  );
};

export default LocationScreen;
