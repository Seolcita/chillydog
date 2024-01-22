import { ReactElement } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Card, Spinner, Typography } from 'sk-storybook';
import Image from 'next/image';

import { QuestionnaireScreenMap } from '../../hooks/use-questionnaire-next-screen-url';
import { ModalProps } from '../Screens/UserProfile/UserProfile';
import * as S from '../Screens/UserProfile/UserProfile.styles';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Dog } from '../../entities/dog.entities';
import { useRouter } from 'next/router';

interface InProgressDogInfoCardProps {
  dog: Dog;
  handleModal: ({ dogId, dogName, event }: ModalProps) => void;
  isSubmitting: boolean;
}

export const InProgressDogInfoCard = ({
  dog,
  handleModal,
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
      ariaLabel='In progress dog profile card'
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
            aria-label={`Complete ${dog.name} profile`}
          >
            <EditNoteIcon fontSize='large' />
          </S.Button>
          <S.Button
            aria-label={`Delete ${dog.name} profile`}
            onClick={(event) =>
              handleModal({ dogId: dog.id, dogName: dog.name, event })
            }
          >
            {isSubmitting ? (
              <Spinner size='xs' />
            ) : (
              <DeleteForeverIcon fontSize='large' />
            )}
          </S.Button>
        </>
      </S.DogContainer>
    </Card>
  );
};
