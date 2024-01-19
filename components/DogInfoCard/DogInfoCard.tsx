import { ReactElement } from 'react';
import { Card, Spinner, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Image from 'next/image';

import * as S from '../Screens/UserProfile/UserProfile.styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { Dog } from '../../entities/dog.entities';

interface DogInfoCardProps {
  dog: Dog;
  handleSubmit: (
    event: React.SyntheticEvent,
    dogId: string,
    dogName: string
  ) => void;
  isSubmitting: boolean;
}

export const DogInfoCard = ({
  dog,
  handleSubmit,
  isSubmitting,
}: DogInfoCardProps): ReactElement => {
  const router = useRouter();

  return (
    <Card
      key={dog.id}
      tabIndex={0}
      isInteractive={false}
      isPadded={true}
      ariaLabel='Completed dog profile card'
      height={5}
      margin={['none', 'none', 'md', 'none']}
    >
      <S.DogContainer>
        <S.AvatarContainer>
          <Image
            src={`/images/avatars/${dog.avatar.name}.png`}
            width={50}
            height={50}
            alt={`${dog.name} avatar`}
            style={{
              borderRadius: '10rem',
              transform: 'scale(1.4)',
              marginRight: '1rem',
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
            onClick={() => router.push(`/dog/${dog.id}`)}
            aria-label={`${dog.name} profile`}
          >
            <SourceOutlinedIcon fontSize='large' />
          </S.Button>
          <form onSubmit={(event) => handleSubmit(event, dog.id, dog.name)}>
            <S.Button aria-label={`Delete ${dog.name} profile`}>
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
