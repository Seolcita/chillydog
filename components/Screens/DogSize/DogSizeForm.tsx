import { Box } from '@mui/material';
import { ReactElement, useState } from 'react';
import { Button, Select } from 'sk-storybook';

import * as S from './DogSizeForm.styles';

enum DogSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export type Option = {
  label: string;
  value: string | number;
};

const options: Option[] = [
  { label: 'Small', value: DogSize.SMALL },
  { label: 'Medium', value: DogSize.MEDIUM },
  { label: 'Large', value: DogSize.LARGE },
];

export const DogSizeForm = (): ReactElement => {
  const [value, setValue] = useState<Option | undefined>();

  const handleSubmit = (event: React.SyntheticEvent) => {
    //TODO: Implement logic for onSubmit
    event.preventDefault();
    console.log(value?.value);
  };

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
          ariaLabel={`Dog's submit button`}
          size='s'
          bgColor='black'
          textColor='white'
          hasShadow={false}
          disabled={!value?.value} //TODO: make disabled when it is loading
          fullWidth
          margin={['xl', 'none']}
        >
          Next
        </Button>
      </form>
    </S.Container>
  );
};
