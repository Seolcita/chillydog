import { ReactElement } from 'react';

import * as S from './CreateDogProfileButton.styles';
import { useRouter } from 'next/router';

export const CreateDogProfileButton = (): ReactElement => {
  const router = useRouter();

  const handleClick = async () => {
    router.push('/questionnaires/name');
  };

  return (
    <S.AddButton onClick={handleClick} aria-label='Create a dog profile'>
      <S.AddIcon />
    </S.AddButton>
  );
};
