import { ReactElement, useContext } from 'react';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import {
  FormValues,
  NameForm,
} from '../../../../components/Screens/Name/NameForm';
import UserContext from '../../../../context/user.context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { User } from '../../../../entities/user.entities';
import withAuth from '../../../../components/HOC/withAuth';

export const EditNameScreen = (): ReactElement => {
  const question = `Q. What is your dog's name?`;
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

  const onSubmit = async ({ name }: FormValues) => {
    if (user) {
      await axios
        .put('http://localhost:3001/api/dog/name/edit', {
          name,
          userId: user.id,
          dogId,
        })
        .then((res) => {
          //TODO: update only dog name
          const user: User = res.data;
          setUser(user);
          router.push(`/dog/${dogId}`);
        })
        .catch((error) => {
          console.error('An error occurred:', error); //TODO: Handle error - Toast message
        });
    } else {
      console.log('no user');
    }
  };

  return (
    <Questionnaire
      edit
      dogId={dogId as string}
      question={question}
      form={<NameForm onSubmit={onSubmit} initialValueName={dog.name} />}
    />
  );
};

export default withAuth(EditNameScreen);
