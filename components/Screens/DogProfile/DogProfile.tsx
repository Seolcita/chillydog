import { ReactElement, useContext } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Card, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import { CloseButton } from '../../CloseButton/CloseButton';
import { DogSize } from '../../../entities/dog.entities';
import UserContext from '../../../context/user.context';
import { Loader } from '../../LineLoader/LineLoader';
import * as S from './DogProfile.styles';

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
            isPadded
            isInteractive={false}
            hasBoxShadow={false}
            ariaLabel='Dog Profile Card'
          >
            <CloseButton
              redirectUrl={`/main?userId=${user?.id}`}
              ariaLabel='Dog profile close'
            />
            <S.Container>
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
                  priority={false}
                  draggable={false}
                />
                <S.ChangeAvatarButton
                  onClick={() =>
                    router.push(`/dog/${dog.id}/edit/avatar-selection`)
                  }
                  aria-label={`Change${dog.name} avatar`}
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.ChangeAvatarButton>
              </S.AvatarContainer>

              <S.Content tabIndex={0}>
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
                  aria-label='Edit dog name'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content tabIndex={0}>
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
                  aria-label='Edit dog size'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content tabIndex={0}>
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
                  aria-label='Edit cold adapt'
                >
                  <DriveFileRenameOutlineIcon fontSize='large' />
                </S.EditIconButton>
              </S.Content>

              <S.Content tabIndex={0}>
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
                  aria-label='Edit heavy coat'
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
