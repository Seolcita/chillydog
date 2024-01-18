/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, ReactElement, useContext } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';

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
        </S.Container>
      )}
    </>
  );
};
