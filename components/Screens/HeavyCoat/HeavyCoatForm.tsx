/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from '@mui/material';
import { ReactElement, useContext, useState } from 'react';
import { Button, Select } from 'sk-storybook';

import * as S from './HeavyCoatForm.styles';
import { Option } from '../../../entities/questionnaire.entities';

interface HeavyCoatFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<Option | undefined>>;
  value: Option | undefined;
}

const options: Option[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const HeavyCoatForm = ({
  handleSubmit,
  setValue,
  value,
}: HeavyCoatFormProps): ReactElement => {
  return (
    <S.Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Box marginTop={'1rem'}>
          <Select
            value={value}
            options={options}
            onChange={(opt: Option) => setValue(opt)}
            height={4.5}
            fullWidth
            color='primary'
          />
        </Box>
        <Button
          ariaLabel={`Dog's coat type submit button`}
          size='s'
          bgColor='black'
          textColor='white'
          hasShadow={false}
          disabled={value?.value === undefined} //TODO: make disabled when it is loading
          fullWidth
          margin={['xl', 'none', 'none', 'none']}
        >
          Next
        </Button>
      </form>
    </S.Container>
  );
};
