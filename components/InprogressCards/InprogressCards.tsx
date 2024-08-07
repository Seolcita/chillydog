import { ReactElement, ReactNode } from 'react';
import { RegistrationStatus } from '../../entities/questionnaire.entities';
import { Dog } from '../../entities/dog.entities';
import { Card, Typography } from 'sk-storybook';
import Image from 'next/image';

import { QuestionnaireScreenMap } from '../../hooks/use-questionnaire-next-screen-url';
import { DeviceType } from '../../hooks/use-window-resize';
import * as S from './InprogressCards.style';
import { useRouter } from 'next/router';
import * as s from '../common-styles';

interface InprogressCardsProps {
  dogs: Dog[];
  deviceType: DeviceType;
}

export const InprogressCards = ({
  dogs,
  deviceType,
}: InprogressCardsProps): ReactElement => {
  const router = useRouter();
  const isMobile = deviceType === DeviceType.MOBILE;

  const handleClick = async (dog: Dog) => {
    const nextScreen = dog.nextScreen && QuestionnaireScreenMap[dog.nextScreen];
    router.push(`/questionnaires/${nextScreen}?dogId=${dog.id}`);
  };

  const CompleteProfileButton = (dog: Dog, isVisible: boolean): ReactNode => {
    return (
      <s.Visibility $isVisible={isVisible}>
        <S.CompleteButton
          onClick={() => handleClick(dog)}
          aria-label='Complete Profile'
        >
          <Typography variant='textXS' color='white' fontWeight='bold'>
            Complete Profile
          </Typography>
        </S.CompleteButton>
      </s.Visibility>
    );
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
                isPadded
                isInteractive={false}
                ariaLabel='In progress dog profile card'
                hasBoxShadow={false}
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
                    priority={false}
                    draggable={false}
                    tabIndex={0}
                  />
                  <S.TextBox tabIndex={0}>
                    <Typography variant='textM' color='black' fontWeight='bold'>
                      Creating <s.Span color='warning'>{dog.name}</s.Span>{' '}
                      profile status is
                      <br />
                      <s.Span color='warning'> IN PROGRESS</s.Span>
                    </Typography>
                    <S.ProgressBarValue>
                      {`${((dog.completedStep / dog.totalSteps) * 100).toFixed(
                        0
                      )}%`}
                    </S.ProgressBarValue>
                    <S.ProgressBar
                      value={(dog.completedStep / dog.totalSteps) * 100}
                      max='100'
                      $isMobile={isMobile}
                    />

                    {CompleteProfileButton(dog, isMobile)}
                  </S.TextBox>

                  {CompleteProfileButton(dog, !isMobile)}
                </S.Contents>
              </Card>
            </S.CardContainer>
          );
        })}
    </>
  );
};
