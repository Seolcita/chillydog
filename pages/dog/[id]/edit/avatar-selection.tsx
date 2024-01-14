/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import UserContext from '../../../../context/user.context';
import {
  AvatarSelectionForm,
  SelectedAvatar,
} from '../../../../components/Screens/AvatarSelection/AvatarSelectionForm';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import withAuth from '../../../../components/HOC/withAuth';

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
    return <div>Loading...</div>; // TODO: Handle properly
  }

  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: dog.avatar.name,
    src: dog.avatar.src,
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(selectedAvatar);

    if (user && selectedAvatar.name !== '' && selectedAvatar.src !== '') {
      await axios
        .put('http://localhost:3001/api/dog/avatar-selection/edit', {
          dogId,
          selectedAvatar,
          userId: user.id,
        })
        .then((res) => {
          const user: User = res.data;
          setUser(user);
          router.push(`/dog/${dogId}`);
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
      edit
      dogId={dogId as string}
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

export default withAuth(EditAvatarSelectionScreen);
