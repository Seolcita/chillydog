/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, ReactElement, useContext } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';

import CompletionAnimation from '../../../assets/complete/complete.json';
import UserContext from '../../../context/user.context';
import { Loader } from '../../LineLoader/LineLoader';
import * as S from './Completion.styled';

export const Completion = (): ReactElement => {
  const router = useRouter();
  const { user, isLoading, refreshUser } = useContext(UserContext);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    user && router.push(`/main?userId=${user.id}`);
    refreshUser();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <S.Container>
          <Card
            ariaLabel={`questionnaire completed`}
            tabIndex={0}
            isPadded
            isInteractive={false}
          >
            <S.Contents>
              <S.Message tabIndex={0}>
                <Typography variant='headingXS' fontWeight='bold'>
                  Congratulation!
                </Typography>
                <Typography variant='headingXS' fontWeight='bold'>
                  Your dog profile is created!
                </Typography>
              </S.Message>
              <S.LottieContainer>
                <Lottie animationData={CompletionAnimation} />
              </S.LottieContainer>
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
        </S.Container>
      )}
    </>
  );
};
