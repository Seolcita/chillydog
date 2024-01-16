/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { HeavyCoatForm } from '../../components/Screens/HeavyCoat/HeavyCoatForm';
import { Option } from '../../entities/questionnaire.entities';
import UserContext from '../../context/user.context';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

const HeavyCoatScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>();

  const { user } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `Q. Is your dog Northern breed or has your dog heavy coat?`;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .post('http://localhost:3001/api/dog/heavy-coat', {
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
          setErrorMessage(errMessage);
          console.error('An error occurred:', error);
        });
    } else {
      setIsSubmitting(false);
      setErrorMessage(errMessage);
      console.error('heavyCoat or user is undefined');
    }
  };

  return (
    <Questionnaire
      currentStep={3}
      question={question}
      form={
        <HeavyCoatForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          value={value}
          isSubmitting={isSubmitting}
        />
      }
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(HeavyCoatScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
