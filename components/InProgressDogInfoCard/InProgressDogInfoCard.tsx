import { ReactElement } from 'react';
import { Card, Spinner, Typography } from 'sk-storybook';
import Image from 'next/image';

import { QuestionnaireScreenMap } from '../../hooks/use-questionnaire-next-screen-url';
import * as S from '../Screens/UserProfile/UserProfile.styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Dog } from '../../entities/dog.entities';
import { useRouter } from 'next/router';

interface InProgressDogInfoCardProps {
  dog: Dog;
  handleSubmit: (
    event: React.SyntheticEvent,
    dogId: string,
    dogName: string
  ) => void;
  isSubmitting: boolean;
}

export const InProgressDogInfoCard = ({
  dog,
  handleSubmit,
  isSubmitting,
}: InProgressDogInfoCardProps): ReactElement => {
  const router = useRouter();

  const handleClick = async (dog: Dog) => {
    const nextScreen = dog.nextScreen && QuestionnaireScreenMap[dog.nextScreen];
    router.push(`/questionnaires/${nextScreen}?dogId=${dog.id}`);
  };

  return (
    <Card
      key={dog.id}
      tabIndex={0}
      isInteractive={false}
      isPadded={true}
      ariaLabel='Dog Profile Card'
      height={5}
      margin={['none', 'none', 'md', 'none']}
    >
      <S.DogContainer>
        <S.AvatarContainer>
          <Image
            src={'/images/others/temp.jpeg'}
            width={20}
            height={20}
            alt={`${dog.name} temporal avatar`}
            style={{
              borderRadius: '10rem',
              margin: '0 1.5rem',
            }}
            priority={true}
            draggable={false}
          />
        </S.AvatarContainer>
        <S.Texts>
          <Typography variant='textM'>{dog.name}</Typography>
        </S.Texts>
        <>
          <S.Button
            onClick={() => handleClick(dog)}
            aria-label={`Complete ${dog.name} profile button`}
          >
            <EditNoteIcon fontSize='large' />
          </S.Button>
          <form onSubmit={(event) => handleSubmit(event, dog.id, dog.name)}>
            <S.Button aria-label={`Delete ${dog.name} profile button`}>
              {isSubmitting ? (
                <Spinner size='xs' />
              ) : (
                <DeleteForeverIcon fontSize='large' />
              )}
            </S.Button>
          </form>
        </>
      </S.DogContainer>
    </Card>
  );
};
