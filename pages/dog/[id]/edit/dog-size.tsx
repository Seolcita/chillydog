/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import UserContext from '../../../../context/user.context';
import {
  DogSizeForm,
  Option,
} from '../../../../components/Screens/DogSize/DogSizeForm';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { DogSize } from '../../../../entities/dog.entities';

const DogSizeInitialValueMap: Record<DogSize, Option> = {
  [DogSize.SMALL]: { label: 'Small', value: DogSize.SMALL },
  [DogSize.MEDIUM]: { label: 'Medium', value: DogSize.MEDIUM },
  [DogSize.LARGE]: { label: 'Large', value: DogSize.LARGE },
};

const EditDogSizeScreen = (): ReactElement => {
  const question = `Q. What is your dog's size?`;
  const router = useRouter();
  const dogId = router.query.id;
  const { user, setUser } = useContext(UserContext);
  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);

  if (!dog) {
    return <div>Loading...</div>; // TODO: Handle properly
  }

  const [value, setValue] = useState<Option | undefined>(
    DogSizeInitialValueMap[dog.dogSize]
  );

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(value?.value);
    if (user && value?.value) {
      await axios
        .put('http://localhost:3001/api/dog/dog-size/edit', {
          dogId,
          dogSize: value.value,
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
      // TODO: Handle error - Toast message
      console.log('no user');
    }
  };

  return (
    <Questionnaire
      edit
      question={question}
      form={
        <DogSizeForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
        />
      }
    />
  );
};

export default EditDogSizeScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
