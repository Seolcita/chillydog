import { ReactElement, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Typography } from 'sk-storybook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import * as S from './NameForm.styled';
import { theme } from '../../../styles/Theme';

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required('Required'),
});

interface FormValues {
  name: string;
}

export const NameForm = (): ReactElement => {
  const onSubmit = async ({ name }: FormValues) => {
    //TODO: Implement logic for onSubmit
    console.log(name);
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
        className={theme.fonts.titillium.className}
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
        bgColor='primary'
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