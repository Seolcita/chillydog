/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import { HeavyCoatForm } from '../../components/Screens/HeavyCoat/HeavyCoatForm';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { Option } from '../../entities/questionnaire.entities';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import withAuth from '../../components/HOC/withAuth';

const HeavyCoatScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const question = `Is your dog Northern breed or has your dog heavy coat?`;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .post(`${process.env.END_POINT_URL}/dog/heavy-coat`, {
          dogId,
          heavyCoat: value.value,
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
      console.error('heavyCoat or user is undefined');
    }
  };

  return (
    <Questionnaire
      currentStep={3}
      question={question}
      errorMessage={errorMessage}
      isLoading={isLoading}
      form={
        <HeavyCoatForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
          isSubmitting={isSubmitting}
        />
      }
    />
  );
};

export default withAuth(HeavyCoatScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
