/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import {
  AvatarSelectionForm,
  SelectedAvatar,
} from '../../../../components/Screens/AvatarSelection/AvatarSelectionForm';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import withAuth from '../../../../components/HOC/withAuth';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';

const EditAvatarSelectionScreen = (): ReactElement => {
  const question = `Choose your dog's avatar`;
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;
  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);

  if (!dog) {
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
    name: dog.avatar.name,
    src: dog.avatar.src,
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
      form={
        <AvatarSelectionForm
          handleSubmit={handleSubmit}
          setValue={setSelectedAvatar}
          value={selectedAvatar}
          isSubmitting={isSubmitting}
        />
      }
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(EditAvatarSelectionScreen);
