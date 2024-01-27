import { ReactElement } from 'react';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Card, Spinner, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { ModalProps } from '../Screens/UserProfile/UserProfile';
import * as S from '../Screens/UserProfile/UserProfile.styles';
import { Dog } from '../../entities/dog.entities';

interface DogInfoCardProps {
  dog: Dog;
  isSubmitting: boolean;
  handleModal: ({ dogId, dogName, event }: ModalProps) => void;
}

export const DogInfoCard = ({
  dog,
  handleModal,
  isSubmitting,
}: DogInfoCardProps): ReactElement => {
  const router = useRouter();

  return (
    <Card
      key={dog.id}
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
            priority={false}
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
