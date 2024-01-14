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
  const question = `Choose your dog's avatar`;
  const { user } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: '',
    src: '',
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(selectedAvatar);

    if (user && selectedAvatar.name !== '' && selectedAvatar.src !== '') {
      await axios
        .post('http://localhost:3001/api/dog/avatar-selection', {
          dogId,
          selectedAvatar,
          userId: user.id,
        })
        .then((res) => {
          const dog: Dog = res.data;
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
      currentStep={6}
      question={question}
      form={
        <AvatarSelectionForm
          handleSubmit={handleSubmit}
          setValue={setSelectedAvatar}
          value={selectedAvatar}
        />
      }
    />
  );
};

export default withAuth(AvatarSelectionScreen);
