/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import {
  AvatarSelectionForm,
  SelectedAvatar,
} from '../../components/Screens/AvatarSelection/AvatarSelectionForm';
import UserContext from '../../context/user.context';
import withAuth from '../../components/HOC/withAuth';
import { Dog } from '../../entities/dog.entities';

const AvatarSelectionScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: '',
    src: '',
  });

  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const question = `Choose your dog's avatar`;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (user && selectedAvatar.name !== '' && selectedAvatar.src !== '') {
      setIsSubmitting(true);

      await axios
        .post(`${process.env.END_POINT_URL}/dog/avatar-selection`, {
          dogId,
          selectedAvatar,
          userId: user.id,
        })
        .then((res) => {
          setIsSubmitting(false);
          const dog: Dog = res.data;
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch(() => {
          setIsSubmitting(false);
          setErrorMessage('Oops! Something went wrong. Please try again.');
        });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Questionnaire
      currentStep={6}
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

export default withAuth(AvatarSelectionScreen);
