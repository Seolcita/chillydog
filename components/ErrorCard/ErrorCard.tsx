import { ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';

import ErrorAnimation from '../../assets/error/error.json';
import * as S from './ErrorCard.styles';

interface ErrorCardProps {
  redirectUrl: string;
  message?: string;
  buttonText?: string;
}

export const ErrorCard = ({
  message = 'Something went wrong!',
  redirectUrl,
  buttonText = 'Go to main page',
}: ErrorCardProps): ReactElement => {
  const router = useRouter();

  const handleClick = async () => {
    router.push(redirectUrl);
  };

  return (
    <S.Wrap>
      <S.CardContainer>
        <Card
          tabIndex={0}
          ariaLabel='Error Card'
          isPadded
          isInteractive={false}
        >
          <S.Contents role='alert' aria-live='assertive'>
            <S.LottieContainer>
              <Lottie animationData={ErrorAnimation} />
            </S.LottieContainer>
            <Typography variant='headingXS' margin={['xl', 'none']}>
              {message}
            </Typography>
            <Button
              bgColor='black'
              textColor='white'
              size='s'
              ariaLabel='Create Dog Profile Button'
              onClick={handleClick}
              fullWidth
            >
              {buttonText}
            </Button>
          </S.Contents>
        </Card>
      </S.CardContainer>
    </S.Wrap>
  );
};
