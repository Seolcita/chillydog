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

import * as S from '../Name/NameForm.styled';
import { titillium } from '../../../styles/Fonts';
import { useRouter } from 'next/router';
import { Dog } from '../../../entities/dog.entities';
import { useQuestionnaireNextScreenURL } from '../../../hooks/use-questionnaire-next-screen-url';
import cities from '../../../utils/city.list.json';

interface City {
  id: string;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

const cityList: City[] = cities;

const schema = yup.object().shape({
  cityName: yup
    .string()
    .min(2)
    .max(20)
    .required('Required')
    .test('cityName-match', 'Invalid city name', function (value) {
      const cityNames = cityList.map((city) => city.name.toLowerCase());
      return cityNames.includes(value.toLowerCase());
    }),
});

interface FormValues {
  cityName: string;
}

export const LocationForm = (): ReactElement => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;

  const onSubmit = async ({ cityName }: FormValues) => {
    try {
      if (userContext.user) {
        await axios
          .post('http://localhost:3001/api/dog/location', {
            dogId,
            location: cityName,
            userId: userContext.user.id,
          })
          .then((res) => {
            const dog: Dog = res.data;
            console.log('dog', dog);
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
      cityName: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  const hasError = errors.cityName && touched.cityName;

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <label htmlFor='cityName'>
        <Typography variant='textS'>City Name</Typography>
      </label>
      <S.Input
        value={values.cityName}
        onChange={handleChange}
        id='cityName'
        type='text'
        onBlur={handleBlur}
        $error={hasError}
        className={titillium.className}
      />
      {hasError && (
        <S.ErrorText $isVisible={hasError}>
          <Typography variant='textS' color='error'>
            <FontAwesomeIcon icon={faCircleExclamation} />
            {errors.cityName}
          </Typography>
        </S.ErrorText>
      )}
      <Button
        ariaLabel='Dog name submit button'
        size='s'
        bgColor='black'
        textColor='white'
        hasShadow={false}
        disabled={isSubmitting || !!errors.cityName}
        fullWidth
        margin={['xl', 'none']}
      >
        Next
      </Button>
    </form>
  );
};
