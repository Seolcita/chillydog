import { ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  FormValues,
  LocationForm,
} from '../../../../components/Screens/Location/LocationForm';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import withAuth from '../../../../components/HOC/withAuth';

export const EditLocationScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { user, setUser, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `Which city is your dog living?`;

  const onSubmit = async ({ cityName }: FormValues) => {
    if (user && cityName) {
      await axios
        .put(`${process.env.END_POINT_URL}/dog/location/edit`, {
          location: cityName,
          userId: user.id,
        })
        .then((res) => {
          const user: User = res.data;
          setUser(user);
          router.push(`/main?userId=${user.id}`);
        })
        .catch((error) => {
          setErrorMessage(errMessage);
          console.error('An error occurred:', error);
        });
    } else {
      setErrorMessage(errMessage);
    }
  };

  return (
    <Questionnaire
      edit
      dogId={dogId as string}
      question={question}
      errorMessage={errorMessage}
      isLoading={isLoading}
      form={
        user && (
          <LocationForm
            onSubmit={onSubmit}
            initialValueLocation={user.location}
          />
        )
      }
    />
  );
};

export default withAuth(EditLocationScreen);
