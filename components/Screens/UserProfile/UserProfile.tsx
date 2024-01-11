import { ReactElement, useContext } from 'react';
import UserContext from '../../../context/user.context';
import { Button, Card, Typography } from 'sk-storybook';
import Image from 'next/image';
import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import * as S from './UserProfile.styles';
import { DogSize } from '../../../entities/dog.entities';
import { FlexCenter } from '../../common-styles';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '../../../entities/user.entities';
import { Box } from '@mui/material';

export const UserProfile = (): ReactElement => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  //TODO: handle modal before deleting dog
  const handleSubmit = async (event: React.SyntheticEvent, dogId: string) => {
    event.preventDefault();
    console.log(dogId);
    if (user && dogId) {
      await axios
        .delete('http://localhost:3001/api/dog/delete', {
          data: { dogId, userId: user.id },
        })
        .then((res) => {
          const user: User = res.data;
          setUser(user);
          //TODO: Add Toast message indicate that dog deletion was successful
        })
        .catch((error) => {
          //TODO: Handle error - Toast message
          console.error('An error occurred:', error);
        });
    } else {
      // TODO: Handle error - Toast message
      console.log('no user');
    }
  };

  return (
    <S.ProfileContainer>
      <Box>
        <Card
          tabIndex={0}
          isInteractive={false}
          isPadded={true}
          ariaLabel='Dog Profile Card'
          margin={['xl', 'none']}
        >
          {user ? (
            <S.Wrapper>
              <S.CloseButton
                onClick={() => router.push(`/main?userId=${user?.id}`)}
                aria-label='Dog profile close button'
              >
                <CancelIcon fontSize='large' />
              </S.CloseButton>
              <S.UserContainer>
                <S.AvatarContainer>
                  <Image
                    src={user.photoUrl}
                    width={80}
                    height={80}
                    alt={`${user.firstName} avatar`}
                    style={{
                      borderRadius: '10rem',
                      transform: 'scale(1.3)',
                      margin: ' 3rem  0rem',
                    }}
                    priority={true}
                    draggable={false}
                  />
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
                    <Typography variant='textM'>
                      {user.firstName} {user.lastName}
                    </Typography>
                  </S.Texts>
                </S.Content>

                <S.Content>
                  <Typography
                    variant='textM'
                    margin={['none', 'lg', 'none', 'none']}
                    fontWeight='bold'
                  >
                    Email:
                  </Typography>
                  <S.Texts>
                    <Typography variant='textM'>{user.email}</Typography>
                  </S.Texts>
                </S.Content>
              </S.UserContainer>
              <Typography
                variant='textS'
                margin={['none', 'none', 'md', 'none']}
              >
                {`${user.firstName}'s dogs`}
              </Typography>
              {user &&
                user.dogs !== undefined &&
                user?.dogs.length > 0 &&
                user?.dogs.map((dog) => {
                  return (
                    dog.registrationStatus === RegistrationStatus.COMPLETED && (
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
                              aria-label={`${dog.name} profile button`}
                            >
                              <SourceOutlinedIcon fontSize='large' />
                            </S.Button>
                            <form
                              onSubmit={(event) => handleSubmit(event, dog.id)}
                            >
                              <S.Button
                                aria-label={`Delete ${dog.name} button`}
                              >
                                <DeleteForeverIcon fontSize='large' />
                              </S.Button>
                            </form>
                          </>
                        </S.DogContainer>
                      </Card>
                    )
                  );
                })}
            </S.Wrapper>
          ) : (
            <div>loading...</div>
          )}
        </Card>
      </Box>
    </S.ProfileContainer>
  );
};
