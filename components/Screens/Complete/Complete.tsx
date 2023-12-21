import { MouseEvent, ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';

import * as S from './Complete.styled';
import { FlexCenter } from '../../common-styles';

export const Complete = (): ReactElement => {
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <FlexCenter>
      <Card
        ariaLabel={`questionnaire completed`}
        tabIndex={0}
        width={45}
        isPadded
        isInteractive={false}
      >
        <S.Contents tabIndex={0}>
          <S.Message>
            <Typography variant='headingXS' fontWeight='bold'>
              Congratulation!
            </Typography>
            <Typography variant='headingXS' fontWeight='bold'>
              Your dog profile is created!
            </Typography>
          </S.Message>
          <S.CompleteImage>
            <iframe src='https://lottie.host/embed/2ecf2dd2-c749-4c9d-a7df-6e9e5aadd28a/A6V31k8XFi.json'></iframe>
          </S.CompleteImage>
          <Button
            ariaLabel='Go to main page button'
            size='l'
            bgColor='black'
            textColor='white'
            hasShadow={false}
            fullWidth
            onClick={handleClick}
          >
            Go to main page
          </Button>
        </S.Contents>
      </Card>
    </FlexCenter>
  );
};
