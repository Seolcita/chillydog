/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../components/Screens/DogSize/DogSizeForm';
import { Option } from '../../entities/questionnaire.entities';
import UserContext from '../../context/user.context';
import withAuth from '../../components/HOC/withAuth';
import { Dog } from '../../entities/dog.entities';

const DogSizeScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  const router = useRouter();
  const dogId = router.query.dogId;
  const { user, isLoading } = useContext(UserContext);
  const question = `What is your dog's size?`;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value) {
      await axios
        .post(`${process.env.END_POINT_URL}/dog/dog-size`, {
          dogId,
          dogSize: value.value,
          userId: user.id,
        })
        .then((res) => {
          setIsSubmitting(false);
          const dog: Dog = res.data;
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch(() => {
          setIsSubmitting(false);
          setErrorMessage('Oops! Something went wrong. Please try again.');
        });
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Questionnaire
      currentStep={2}
      question={question}
      errorMessage={errorMessage}
      isLoading={isLoading}
      form={
        <DogSizeForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
          isSubmitting={isSubmitting}
        />
      }
    />
  );
};

export default withAuth(DogSizeScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
