/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext } from 'react';
import { Questionnaire } from '../../components/Questionnaire/Questionnaire';
import { FormValues, NameForm } from '../../components/Screens/Name/NameForm';
import UserContext from '../../context/user.context';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dog } from '../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../hooks/use-questionnaire-next-screen-url';

const NameScreen = (): ReactElement => {
  const question = `Q. What is your dog's name?`;
  const userContext = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async ({ name }: FormValues) => {
    try {
      if (userContext.user) {
        await axios
          .post('http://localhost:3001/api/dog/name', {
            name,
            userId: userContext.user.id,
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
    } catch (error) {
      console.error('An error occurred:', error);
      // TODO: Handle error - Toast message
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

export default NameScreen;
