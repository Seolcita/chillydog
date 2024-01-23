/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { HeavyCoatForm } from '../../../../components/Screens/HeavyCoat/HeavyCoatForm';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { Option } from '../../../../entities/questionnaire.entities';
import withAuth from '../../../../components/HOC/withAuth';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';

const EditHeavyCoatScreen = (): ReactElement => {
  const question = `Q. Is your dog Northern breed or has your dog heavy coat?`;
  const { user, setUser, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>(undefined);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .put(`${process.env.END_POINT_URL}/dog/heavy-coat/edit`, {
          dogId,
          heavyCoat: value.value,
          userId: user.id,
        })
        .then((res) => {
          setIsSubmitting(false);
          const user: User = res.data;
          setUser(user);
          router.push(`/dog/${dogId}`);
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
      edit
      dogId={dogId as string}
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

export default withAuth(EditHeavyCoatScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
