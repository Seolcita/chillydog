import { ReactElement, useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Typography } from 'sk-storybook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import * as S from './NameForm.styled';
import { titillium } from '../../../styles/Fonts';
import axios from 'axios';
import UserContext from '../../../context/user.context';
import { Questionnaire } from '../../Questionnaire/Questionnaire';
import { QuestionnaireScreenName } from '../../../hooks/use-decide-screen';

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required('Required'),
});

interface FormValues {
  name: string;
}

export const NameForm = (): ReactElement => {
  const [nextScreen, setNextScreen] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const onSubmit = async ({ name }: FormValues) => {
    try {
      if (userContext.user) {
        await axios
          .post('http://localhost:3001/api/dog/name', {
            name,
            userId: userContext.user.id,
          })
          .then((res) => {
            console.log('🥎🐶', res.data);
            // userContext.setUser(res.data);
            // setNextScreen(
            //   QuestionnaireScreenName[
            //     res.data.screens.nameScreen
            //       .nextScreen as keyof typeof QuestionnaireScreenName
            //   ]
            // );
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
