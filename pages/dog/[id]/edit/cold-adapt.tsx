/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { ColdAdaptForm } from '../../../../components/Screens/ColdAdapt/ColdAdaptForm';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';
import { Option } from '../../../../entities/questionnaire.entities';
import UserContext from '../../../../context/user.context';
import withAuth from '../../../../components/HOC/withAuth';
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
    return (
      <ErrorCard
        redirectUrl={`/dog/${dogId}`}
        buttonText='Go Back To Dog Profile Page'
      />
    );
  }

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState<Option | undefined>(
    ColdAdaptInitialValueMap[dog.coldAdapt.toString()]
  );

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .put('http://localhost:3001/api/dog/cold-adapt/edit', {
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
          console.error('An error occurred:', error);
        });
    } else {
      setIsSubmitting(false);
      console.error('coldAdapt or user is undefined');
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
          isSubmitting={isSubmitting}
        />
      }
      errorMessage={errorMessage}
    />
  );
};

export default withAuth(EditColdAdaptScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
