import { ReactElement } from 'react';
import { Button, Card } from 'sk-storybook';
import { useRouter } from 'next/router';
import * as S from './CreateDogProfileCard.style';
import { Box } from '@mui/material';

export const CreateDogProfile = (): ReactElement => {
  const router = useRouter();
  const handleClick = async () => {
    router.push('/questionnaires/name');
  };

  return (
    <S.CardContainer>
      <Card
        tabIndex={0}
        isPadded
        isInteractive={false}
        ariaLabel='Create dog profile card'
        width={30}
      >
        <S.Contents>
          <iframe src='https://lottie.host/embed/aea7d986-6070-4116-9bfd-53f2de7a3e3a/J5rYKAGYgF.json'></iframe>
          <Button
            bgColor='black'
            textColor='white'
            size='s'
            ariaLabel='Create Dog Profile Button'
            onClick={handleClick}
          >
            Create a dog profile
          </Button>
        </S.Contents>
      </Card>
    </S.CardContainer>
  );
};
