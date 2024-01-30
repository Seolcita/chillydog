/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { Button, Select, Spinner } from 'sk-storybook';

import * as S from './HeavyCoatForm.styles';
import { Option } from '../../../entities/questionnaire.entities';

interface HeavyCoatFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<Option | undefined>>;
  value: Option | undefined;
  isSubmitting: boolean;
}

const options: Option[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const HeavyCoatForm = ({
  handleSubmit,
  setValue,
  value,
  isSubmitting,
}: HeavyCoatFormProps): ReactElement => {
  return (
    <S.Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Box marginTop={'1rem'} marginBottom={'2rem'}>
          <Select
            value={value}
            options={options}
            onChange={(opt: Option) => setValue(opt)}
            height={6}
            fullWidth
            color='primary'
          />
        </Box>
        <Button
          ariaLabel={`Dog coat type submit button`}
          size='s'
          bgColor='black'
          textColor='white'
          hasShadow={false}
          disabled={value?.value === undefined || isSubmitting}
          fullWidth
          margin={['xl', 'none', 'none', 'none']}
        >
          {isSubmitting ? <Spinner size='xs' /> : 'Continue'}
        </Button>
      </form>
    </S.Container>
  );
};
