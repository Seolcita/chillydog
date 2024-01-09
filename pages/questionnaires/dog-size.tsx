/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { Dog } from '../../entities/dog.entities';
import UserContext from '../../context/user.context';
import { Option } from '../../entities/questionnaire.entities';

const DogSizeScreen = (): ReactElement => {
  const question = `Q. What is your dog's size?`;
  const router = useRouter();
  const dogId = router.query.dogId;
  const { user } = useContext(UserContext);
  const [value, setValue] = useState<Option | undefined>();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(value?.value);
    if (user && value?.value) {
      await axios
        .post('http://localhost:3001/api/dog/dog-size', {
          dogId,
          dogSize: value.value,
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
      // TODO: Handle error - Toast message
      console.log('no user');
    }
  };

  return (
    <Questionnaire
      currentStep={2}
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

export default DogSizeScreen;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
