/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Typography } from 'sk-storybook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UserContext from '../../../context/user.context';
import { Questionnaire } from '../../Questionnaire/Questionnaire';
// import { QuestionnaireScreenName } from '../../../hooks/use-decide-screen';

import * as S from './NameForm.styled';
import { titillium } from '../../../styles/Fonts';
import { useRouter } from 'next/router';
import { Dog } from '../../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../../hooks/use-questionnaire-next-screen-url';

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required('Required'),
});

interface FormValues {
  name: string;
}

export const NameForm = (): ReactElement => {
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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  const hasError = errors.name && touched.name;

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <label htmlFor='name'>
        <Typography variant='textS'>Name</Typography>
      </label>
      <S.Input
        value={values.name}
        onChange={handleChange}
        id='name'
        type='text'
        onBlur={handleBlur}
        $error={hasError}
        className={titillium.className}
      />
      {hasError && (
        <S.ErrorText $isVisible={hasError}>
          <Typography variant='textS' color='error'>
            <FontAwesomeIcon icon={faCircleExclamation} />
            {errors.name}
          </Typography>
        </S.ErrorText>
      )}
      <Button
        ariaLabel='Dog name submit button'
        size='s'
        bgColor='black'
        textColor='white'
        hasShadow={false}
        disabled={isSubmitting || !!errors.name}
        fullWidth
        margin={['xl', 'none']}
      >
        Next
      </Button>
    </form>
  );
};
