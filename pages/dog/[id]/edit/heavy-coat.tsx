/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Option } from '../../../../entities/questionnaire.entities';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { HeavyCoatForm } from '../../../../components/Screens/HeavyCoat/HeavyCoatForm';

const HeavyCoatInitialValueMap: Record<string, Option> = {
  true: { label: 'Yes', value: true },
  false: { label: 'No', value: false },
};

const EditHeavyCoatScreen = (): ReactElement => {
  const question = `Q. Is your dog Northern breed or has your dog heavy coat?`;
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
  const [value, setValue] = useState<Option | undefined>(
    HeavyCoatInitialValueMap[dog.heavyCoat.toString()]
  );

  const handleSubmit = async (event: React.SyntheticEvent) => {
    //TODO: Implement logic for onSubmit
    event.preventDefault();
    console.log(value?.value);

    if (user && value?.value !== undefined) {
      await axios
        .put('http://localhost:3001/api/dog/heavy-coat/edit', {
          dogId,
          heavyCoat: value.value,
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
      question={question}
      form={
        <HeavyCoatForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
        />
      }
    />
  );
};

export default EditHeavyCoatScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
