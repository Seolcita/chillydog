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

  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;
  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);
  const question = `Q. What is your dog's name?`;

  if (!dog) {
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
        .put('http://localhost:3001/api/dog/name/edit', {
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
          setErrorMessage('Oops! Something went wrong. Please try again.');
          console.error('An error occurred:', error);
        });
    }
  };

  return (
    <Questionnaire
      edit
      dogId={dogId as string}
      question={question}
      form={<NameForm onSubmit={onSubmit} initialValueName={dog.name} />}
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(EditNameScreen);
