/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { ColdAdaptForm } from '../../components/Screens/ColdAdapt/ColdAdaptForm';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { Option } from '../../entities/questionnaire.entities';
import withAuth from '../../components/HOC/withAuth';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';

const ColdAdaptScreen = (): ReactElement => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [value, setValue] = useState<Option | undefined>();

  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const question = `Q. Is your dog acclimated to cold?`;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .post('http://localhost:3001/api/dog/cold-adapt', {
          dogId,
          coldAdapt: value.value,
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
      setIsSubmitting(false);
      console.error('coldAdapt or user is undefined');
    }
  };

  return (
    <Questionnaire
      currentStep={4}
      question={question}
      errorMessage={errorMessage}
      isLoading={isLoading}
      form={
        <ColdAdaptForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
          isSubmitting={isSubmitting}
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
