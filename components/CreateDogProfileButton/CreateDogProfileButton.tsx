import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import * as S from './CreateDogProfileButton.styles';

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
