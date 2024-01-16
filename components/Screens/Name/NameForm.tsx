import { ReactElement } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Spinner, Typography } from 'sk-storybook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import * as S from './NameForm.styled';
import { titillium } from '../../../styles/Fonts';

interface NameFormProps {
  onSubmit: (values: FormValues) => void;
  initialValueName?: string;
}

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required('Required'),
});

export interface FormValues {
  name: string;
}

export const NameForm = ({
  onSubmit,
  initialValueName,
}: NameFormProps): ReactElement => {
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
      name: initialValueName ?? '',
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
        margin={['xl', 'none', 'none', 'none']}
      >
        {isSubmitting ? <Spinner size='xs' /> : 'Continue'}
      </Button>
    </form>
  );
};
