import { ReactElement } from 'react';
import { Dog } from '../../entities/dog.entities';
import { RegistrationStatus } from '../../entities/questionnaire.entities';
import Image from 'next/image';
import { Button, Card, Typography } from 'sk-storybook';

import * as S from './InprogressCards.style';
import { useRouter } from 'next/router';
import { QuestionnaireScreenMap } from '../../hooks/use-questionnaire-next-screen-url';

interface InprogressCardsProps {
  dogs: Dog[];
}

export const InprogressCards = ({
  dogs,
}: InprogressCardsProps): ReactElement => {
  const router = useRouter();
  const handleClick = async (dog: Dog) => {
    const nextScreen = dog.nextScreen && QuestionnaireScreenMap[dog.nextScreen];
    router.push(`/questionnaires/${nextScreen}?dogId=${dog.id}`);
  };

  return (
    <>
      {dogs
        .filter(
          (dog) => dog.registrationStatus === RegistrationStatus.IN_PROGRESS
        )
        .map((dog) => {
          return (
            <S.CardContainer key={dog.id}>
              <Card
                tabIndex={0}
                isPadded
                isInteractive={false}
                ariaLabel='In progress dog profile card'
              >
                <S.Contents>
                  <Image
                    src='/images/others/temp.jpeg'
                    width={45}
                    height={45}
                    alt='In progress avatar'
                    style={{
                      borderRadius: '10rem',
                      marginLeft: '1.5rem',
                    }}
                    priority={true}
                    draggable={false}
                    tabIndex={0}
                  />
                  <S.TextBox>
                    <Typography
                      variant='textM'
                      color='black'
                    >{`Creating ${dog.name}'s profile status is`}</Typography>
                    <Typography variant='textM' color='black'>
                      IN PROGRESS.
                    </Typography>
                    {/* TODO:Create ProgressBar component */}
                    {/* <div>ProgressBar</div> */}
                  </S.TextBox>
                  <button onClick={() => handleClick(dog)}>
                    Complete Profile
                  </button>
                </S.Contents>
              </Card>
            </S.CardContainer>
          );
        })}
    </>
  );
};
