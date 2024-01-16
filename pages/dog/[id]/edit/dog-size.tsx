/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Questionnaire } from '../../../../components/Questionnaire/Questionnaire';
import { DogSizeForm } from '../../../../components/Screens/DogSize/DogSizeForm';
import { ErrorCard } from '../../../../components/ErrorCard/ErrorCard';
import { Option } from '../../../../entities/questionnaire.entities';
import { DogSize } from '../../../../entities/dog.entities';
import withAuth from '../../../../components/HOC/withAuth';
import UserContext from '../../../../context/user.context';
import { User } from '../../../../entities/user.entities';

const DogSizeInitialValueMap: Record<DogSize, Option> = {
  [DogSize.SMALL]: { label: 'Small', value: DogSize.SMALL },
  [DogSize.MEDIUM]: { label: 'Medium', value: DogSize.MEDIUM },
  [DogSize.LARGE]: { label: 'Large', value: DogSize.LARGE },
};

const EditDogSizeScreen = (): ReactElement => {
  const errMessage = 'Oops! Something went wrong. Please try again.';
  const question = `Q. What is your dog's size?`;
  const router = useRouter();
  const dogId = router.query.id;
  const { user, setUser } = useContext(UserContext);
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
    DogSizeInitialValueMap[dog.dogSize]
  );

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && value?.value) {
      await axios
        .put('http://localhost:3001/api/dog/dog-size/edit', {
          dogId,
          dogSize: value.value,
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
      console.error('dogSize or user is undefined');
    }
  };

  return (
    <Questionnaire
      edit
      dogId={dogId as string}
      question={question}
      form={
        <DogSizeForm
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

export default withAuth(EditDogSizeScreen);

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
