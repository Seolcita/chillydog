import { Box } from '@mui/material';
import { ReactElement, useState } from 'react';
import { Button, Select } from 'sk-storybook';

import * as S from './ColdAdaptForm.styles';

export type Option = {
  label: string;
  value: string | number | boolean;
};

const options: Option[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export const ColdAdaptForm = (): ReactElement => {
  const [value, setValue] = useState<Option | undefined>();

  const handleSubmit = (event: React.SyntheticEvent) => {
    //TODO: Implement logic for onSubmit
    event.preventDefault();
    console.log(value?.value);
  };

  return (
    <S.FormContainer>
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
    </S.FormContainer>
  );
};
