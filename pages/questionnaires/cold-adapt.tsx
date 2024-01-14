/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { ColdAdaptForm } from '../../components/Screens/ColdAdapt/ColdAdaptForm';
import { Option } from '../../entities/questionnaire.entities';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

const ColdAdaptScreen = (): ReactElement => {
  const question = `Q. Is your dog acclimated to cold?`;
  const [value, setValue] = useState<Option | undefined>();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(value?.value);

    if (user && value?.value !== undefined) {
      await axios
        .post('http://localhost:3001/api/dog/cold-adapt', {
          dogId,
          coldAdapt: value.value,
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
      currentStep={4}
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

export default withAuth(ColdAdaptScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
