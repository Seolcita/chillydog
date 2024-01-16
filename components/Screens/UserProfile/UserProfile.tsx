import { ReactElement, useContext, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { Card, Spinner, Typography } from 'sk-storybook';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import UserContext from '../../../context/user.context';
import { User } from '../../../entities/user.entities';
import * as S from './UserProfile.styles';
import { Notification } from '../../Notification/Notification';

export const UserProfile = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const hasDogs = user?.dogs !== undefined && user?.dogs.length > 0;

  //TODO: handle modal before deleting dog
  const handleSubmit = async (
    event: React.SyntheticEvent,
    dogId: string,
    dogName: string
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    if (user && dogId) {
      await axios
        .delete('http://localhost:3001/api/dog/delete', {
          data: { dogId, userId: user.id },
        })
        .then((res) => {
          setIsSubmitting(false);
          const user: User = res.data;
          setUser(user);
          setSuccessMessage(`${dogName} is deleted successfully.`);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(`Fail to delete ${dogName}. Please try again`);
          console.error('An error occurred:', error);
        });
    }
  };

  return (
    <>
      {user && (
        <S.ProfileContainer>
          <Card
            tabIndex={0}
            isInteractive={false}
            isPadded={true}
            ariaLabel='Dog Profile Card'
            margin={['xl', 'none']}
          >
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
                {/* TODO: If no dogs, add dog button */}
                {hasDogs ? `${user.firstName}'s dogs` : 'No dogs yet'}
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
                              onSubmit={(event) =>
                                handleSubmit(event, dog.id, dog.name)
                              }
                            >
                              <S.Button
                                aria-label={`Delete ${dog.name} button`}
                              >
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
                    )
                  );
                })}
            </S.Wrapper>
          </Card>
          {errorMessage && (
            <Notification message={errorMessage} variant='error' />
          )}
          {successMessage && (
            <Notification message={successMessage} variant='success' />
          )}
        </S.ProfileContainer>
      )}
    </>
  );
};
