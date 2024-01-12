/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Option } from '../../../../entities/questionnaire.entities';
import UserContext from '../../../../context/user.context';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { ColdAdaptForm } from '../../../../components/Screens/ColdAdapt/ColdAdaptForm';
import { User } from '../../../../entities/user.entities';

const ColdAdaptInitialValueMap: Record<string, Option> = {
  true: { label: 'Yes', value: true },
  false: { label: 'No', value: false },
};

const EditColdAdaptScreen = (): ReactElement => {
  const question = `Q. Is your dog acclimated to cold?`;
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
    ColdAdaptInitialValueMap[dog.coldAdapt.toString()]
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(value?.value);

    if (user && value?.value !== undefined) {
      await axios
        .put('http://localhost:3001/api/dog/cold-adapt/edit', {
          dogId,
          coldAdapt: value.value,
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
        <ColdAdaptForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
        />
      }
    />
  );
};

export default EditColdAdaptScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
