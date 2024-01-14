/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { FormValues, NameForm } from '../../components/Screens/Name/NameForm';
import UserContext from '../../context/user.context';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';
import withAuth from '../../components/HOC/withAuth';

const NameScreen = (): ReactElement => {
  const question = `Q. What is your dog's name?`;
  const { user } = useContext(UserContext);
  const router = useRouter();

  //TODO: Handle this properly
  if (!user) {
    return <div>loading...</div>;
  }

  const onSubmit = async ({ name }: FormValues) => {
    if (user) {
      await axios
        .post('http://localhost:3001/api/dog/name', {
          name,
          userId: user.id,
        })
        .then((res) => {
          const dog: Dog = res.data;
          const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
          router.push(nextScreenUrl);
        })
        .catch((error) => {
          console.error('An error occurred:', error); //TODO: Handle error - Toast message
        });
    } else {
      console.log('no user');
    }
  };

  return (
    <Questionnaire
      currentStep={1}
      question={question}
      form={<NameForm onSubmit={onSubmit} />}
    />
  );
};

export default withAuth(NameScreen);
