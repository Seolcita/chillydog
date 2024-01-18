import { ReactElement, useContext, useLayoutEffect } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import { DogSize } from '../../../entities/dog.entities';
import UserContext from '../../../context/user.context';
import * as S from './DogProfile.styles';
import { Loader } from '../../LineLoader/LineLoader';

interface DogProfileProps {
  dogId: string | string[];
}

const DogSizeMap: Record<DogSize, string> = {
  [DogSize.SMALL]: 'Small',
  [DogSize.MEDIUM]: 'Medium',
  [DogSize.LARGE]: 'Large',
};

export const DogProfile = ({ dogId }: DogProfileProps): ReactElement => {
  const router = useRouter();
  const { user, isLoading } = useContext(UserContext);

  const dog =
    user?.dogs !== undefined &&
    user?.dogs.length > 0 &&
    user.dogs.find((dog) => dog.id === dogId);

  return (
    <>
      {!isLoading &&
      dog &&
      dog.registrationStatus === RegistrationStatus.COMPLETED ? (
        <S.ProfileContainer>
          <Card
            tabIndex={0}
            isInteractive={false}
            isPadded={true}
            ariaLabel='Dog Profile Card'
          >
            <S.Container>
              <S.CloseButton
                onClick={() => router.push(`/main?userId=${user?.id}`)}
                aria-label='Dog profile close button'
              >
                <CancelIcon fontSize='large' />
              </S.CloseButton>
              <S.AvatarContainer>
                <Image
                  src={`/images/avatars/${dog.avatar.name}.png`}
                  width={80}
                  height={80}
                  alt={`${dog.name} avatar`}
                  style={{
                    borderRadius: '10rem',
                    transform: 'scale(1.8)',
                    margin: ' 2rem  0rem',
                  }}
                  priority={true}
                  draggable={false}
                />
                <S.ChangeAvatarButton
                  onClick={() =>
                    router.push(`/dog/${dog.id}/edit/avatar-selection`)
                  }
                  aria-label='Change avatar button'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.ChangeAvatarButton>
              </S.AvatarContainer>

              <S.Content>
                <Typography
                  variant='textM'
                  margin={['none', 'lg', 'none', 'none']}
                  fontWeight='bold'
                >
                  Name:
                </Typography>
                <S.Texts>
                  <Typography variant='textM'>{dog.name}</Typography>
                </S.Texts>
                <S.EditIconButton
                  onClick={() => router.push(`/dog/${dog.id}/edit/name`)}
                  aria-label='Edit dog name button'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content>
                <Typography
                  variant='textM'
                  margin={['none', 'lg', 'none', 'none']}
                  fontWeight='bold'
                >
                  Size:
                </Typography>
                <S.Texts>
                  <Typography variant='textM'>
                    {DogSizeMap[dog.dogSize]}
                  </Typography>
                </S.Texts>
                <S.EditIconButton
                  onClick={() => router.push(`/dog/${dog.id}/edit/dog-size`)}
                  aria-label='Edit dog size button'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content>
                <Typography
                  variant='textM'
                  margin={['none', 'lg', 'none', 'none']}
                  fontWeight='bold'
                >
                  Acclimated to cold :
                </Typography>
                <S.Texts>
                  <Typography variant='textM'>
                    {dog.coldAdapt ? 'Yes' : 'No'}
                  </Typography>
                </S.Texts>
                <S.EditIconButton
                  onClick={() => router.push(`/dog/${dog.id}/edit/cold-adapt`)}
                  aria-label='Edit cold adapt button'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content>
                <Typography
                  variant='textM'
                  margin={['none', 'lg', 'none', 'none']}
                  fontWeight='bold'
                >
                  Northern breed / Heavy coat:
                </Typography>
                <S.Texts>
                  <Typography variant='textM'>
                    {dog.heavyCoat ? 'Yes' : 'No'}
                  </Typography>
                </S.Texts>
                <S.EditIconButton
                  onClick={() => router.push(`/dog/${dog.id}/edit/heavy-coat`)}
                  aria-label='Edit heavy coat button'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>
            </S.Container>
          </Card>
        </S.ProfileContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
