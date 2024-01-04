/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from '@mui/material';
import { ReactElement, SyntheticEvent, useContext, useState } from 'react';
import { Button, Select } from 'sk-storybook';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuestionnaireNextScreenURL } from '../../../hooks/use-questionnaire-next-screen-url';
import { Dog } from '../../../entities/dog.entities';
import * as S from './ColdAdaptForm.styles';
import UserContext from '../../../context/user.context';

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
  const userContext = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(value?.value);

    try {
      if (userContext.user && value?.value !== undefined) {
        await axios
          .post('http://localhost:3001/api/dog/cold-adapt', {
            dogId,
            coldAdapt: value.value,
            userId: userContext.user.id,
          })
          .then((res) => {
            const dog: Dog = res.data;
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
