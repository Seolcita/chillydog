/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { ColdAdaptForm } from '../../../../components/Screens/ColdAdapt/ColdAdaptForm';
import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { Option } from '../../../../entities/questionnaire.entities';
import UserContext from '../../../../context/user.context';
import withAuth from '../../../../components/HOC/withAuth';
import { User } from '../../../../entities/user.entities';

const EditColdAdaptScreen = (): ReactElement => {
  const question = `Is your dog acclimated to cold?`;
  const { user, setUser, isLoading } = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.id;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>(undefined);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .put(`${process.env.END_POINT_URL}/dog/cold-adapt/edit`, {
          dogId,
          coldAdapt: value.value,
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
        });
    } else {
      setIsSubmitting(false);
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

export default withAuth(EditColdAdaptScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
