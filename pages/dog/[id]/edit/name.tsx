import { ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  FormValues,
  NameForm,
} from '../../../../components/Screens/Name/NameForm';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';
import withAuth from '../../../../components/HOC/withAuth';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';

export const EditNameScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { user, setUser, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;
  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `What is your dog's name?`;

  if (!dog && !isLoading) {
    return (
      <ErrorCard
        redirectUrl={`/dog/${dogId}`}
        buttonText='Go Back To Dog Profile Page'
      />
    );
  }

  const onSubmit = async ({ name }: FormValues) => {
    if (user && name && dogId) {
      await axios
        .put(`${process.env.END_POINT_URL}/dog/name/edit`, {
          name,
          userId: user.id,
          dogId,
        })
        .then((res) => {
          const user: User = res.data;
          setUser(user);
          router.push(`/dog/${dogId}`);
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
        <NameForm
          onSubmit={onSubmit}
          initialValueName={dog && dog?.name ? dog.name : ''}
        />
      }
    />
  );
};

export default withAuth(EditNameScreen);
