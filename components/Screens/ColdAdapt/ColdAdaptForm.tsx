/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { Button, Select } from 'sk-storybook';

import * as S from './ColdAdaptForm.styles';
import { Option } from '../../../entities/questionnaire.entities';

interface ColdAdaptFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<Option | undefined>>;
  value: Option | undefined;
}

const options: Option[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const ColdAdaptForm = ({
  handleSubmit,
  setValue,
  value,
}: ColdAdaptFormProps): ReactElement => {
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
          ariaLabel={`Dog's cold adaptability submit button`}
          size='s'
          bgColor='black'
          textColor='white'
          hasShadow={false}
          disabled={value?.value === undefined} //TODO: make disabled when it is loading
          fullWidth
          margin={['xl', 'none']}
        >
          Next
        </Button>
      </form>
    </S.Container>
  );
};
