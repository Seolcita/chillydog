/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';
import { Box } from '@mui/material';
import { Button, Select, Spinner } from 'sk-storybook';

import * as S from './DogSizeForm.styles';
import { DogSize } from '../../../entities/dog.entities';
import { Option } from '../../../entities/questionnaire.entities';
import { DeviceType, useWindowSize } from '../../../hooks/use-window-resize';

interface DogSizeFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<Option | undefined>>;
  value: Option | undefined;
  isSubmitting: boolean;
}

const options: Option[] = [
  { label: 'Small', value: DogSize.SMALL },
  { label: 'Medium', value: DogSize.MEDIUM },
  { label: 'Large', value: DogSize.LARGE },
];

export const DogSizeForm = ({
  handleSubmit,
  setValue,
  value,
  isSubmitting,
}: DogSizeFormProps): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;

  return (
    <S.Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Box marginTop={'1rem'} marginBottom={'4.5rem'}>
          <Select
            value={value}
            options={options}
            onChange={(opt: Option) => setValue(opt)}
            height={isMobile ? 7 : 5}
            fullWidth
            color='primary'
          />
        </Box>
        <Button
          ariaLabel={`Dog size submit button`}
          size='s'
          bgColor='black'
          textColor='white'
          hasShadow={false}
          disabled={!value?.value || isSubmitting}
          fullWidth
          margin={['xl', 'none', 'none', 'none']}
        >
          {isSubmitting ? <Spinner size='xs' /> : 'Continue'}
        </Button>
      </form>
    </S.Container>
  );
};
