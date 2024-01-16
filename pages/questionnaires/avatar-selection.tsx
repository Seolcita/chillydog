/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import {
  AvatarSelectionForm,
  SelectedAvatar,
} from '../../components/Screens/AvatarSelection/AvatarSelectionForm';
import UserContext from '../../context/user.context';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

const AvatarSelectionScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: '',
    src: '',
  });

  const { user } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const question = `Choose your dog's avatar`;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(selectedAvatar);

    if (user && selectedAvatar.name !== '' && selectedAvatar.src !== '') {
      setIsSubmitting(true);

      await axios
        .post('http://localhost:3001/api/dog/avatar-selection', {
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
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage('Oops! Something went wrong. Please try again.');
          console.error('An error occurred:', error);
        });
    } else {
      if (!user) {
        setErrorMessage('User not found. Please login.');
        router.push('/auth/signin');
      } else {
        setIsSubmitting(false);
        setErrorMessage('Dog size not found. Please try again.');
      }
    }
  };

  return (
    <Questionnaire
      currentStep={6}
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

export default withAuth(AvatarSelectionScreen);
