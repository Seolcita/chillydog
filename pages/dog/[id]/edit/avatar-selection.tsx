/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  AvatarSelectionForm,
  SelectedAvatar,
} from '../../../../components/Screens/AvatarSelection/AvatarSelectionForm';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';
import withAuth from '../../../../components/HOC/withAuth';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';

const EditAvatarSelectionScreen = (): ReactElement => {
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `Choose your dog's avatar`;
  const { user, setUser, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;
  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);

  if (!dog && !isLoading) {
    return (
      <ErrorCard
        redirectUrl={`/dog/${dogId}`}
        buttonText='Go Back To Dog Profile Page'
      />
    );
  }

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: dog && dog.avatar ? dog.avatar.name : '',
    src: dog && dog.avatar ? dog.avatar.src : '',
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setIsSubmitting(true);

    if (user && selectedAvatar.name !== '' && selectedAvatar.src !== '') {
      await axios
        .put('http://localhost:3001/api/dog/avatar-selection/edit', {
          dogId,
          selectedAvatar,
          userId: user.id,
        })
        .then((res) => {
          setIsSubmitting(false);
          const user: User = res.data;
          setUser(user);
          router.push(`/dog/${dogId}`);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(errMessage);
          console.error('An error occurred:', error);
        });
    } else {
      setIsSubmitting(false);
      setErrorMessage(errMessage);
      console.error('avatar or user is undefined');
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
        <AvatarSelectionForm
          handleSubmit={handleSubmit}
          setValue={setSelectedAvatar}
          value={selectedAvatar}
          isSubmitting={isSubmitting}
        />
      }
    />
  );
};

export default withAuth(EditAvatarSelectionScreen);
