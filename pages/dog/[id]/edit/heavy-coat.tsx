/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { HeavyCoatForm } from '../../../../components/Screens/HeavyCoat/HeavyCoatForm';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';
import { Option } from '../../../../entities/questionnaire.entities';
import withAuth from '../../../../components/HOC/withAuth';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';

const HeavyCoatInitialValueMap: Record<string, Option> = {
  true: { label: 'Yes', value: true },
  false: { label: 'No', value: false },
};

const EditHeavyCoatScreen = (): ReactElement => {
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `Q. Is your dog Northern breed or has your dog heavy coat?`;
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
    HeavyCoatInitialValueMap[dog.heavyCoat.toString()]
  );

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value !== undefined) {
      await axios
        .put('http://localhost:3001/api/dog/heavy-coat/edit', {
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
      edit
      dogId={dogId as string}
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

export default withAuth(EditHeavyCoatScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
