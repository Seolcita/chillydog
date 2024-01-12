import { ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserContext from '../../../../context/user.context';
import {
  FormValues,
  LocationForm,
} from '../../../../components/Screens/Location/LocationForm';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';

export const EditLocationScreen = (): ReactElement => {
  const question = `Q. Which city is your dog living?`;
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const dogId = router.query.id;

  const onSubmit = async ({ cityName }: FormValues) => {
    if (user) {
      await axios
        .put('http://localhost:3001/api/dog/location/edit', {
          location: cityName,
          userId: user.id,
        })
        .then((res) => {
          const user: User = res.data;
          setUser(user);
          router.push(`/main?userId=${user.id}`);
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

export default EditLocationScreen;
