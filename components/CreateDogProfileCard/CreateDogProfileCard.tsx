import { ReactElement } from 'react';
import { Button, Card } from 'sk-storybook';
import { useRouter } from 'next/router';
import Lottie from 'lottie-react';

import CreateDogProfileAnimation from '../../assets/createDogProfile/createDogProfile.json';
import * as S from './CreateDogProfileCard.styles';

export const CreateDogProfile = (): ReactElement => {
  const router = useRouter();
  const handleClick = async () => {
    router.push('/questionnaires/name');
  };

  return (
    <S.Wrap>
      <S.CardContainer>
        <Card
          tabIndex={0}
          isPadded
          isInteractive={false}
          ariaLabel='Create dog profile card'
          width={30}
        >
          <S.Contents>
            <S.LottieContainer>
              <Lottie animationData={CreateDogProfileAnimation} />
            </S.LottieContainer>
            <Button
              bgColor='black'
              textColor='white'
              size='m'
              ariaLabel='Create Dog Profile'
              onClick={handleClick}
            >
              Create a dog profile
            </Button>
          </S.Contents>
        </Card>
      </S.CardContainer>
    </S.Wrap>
  );
};
