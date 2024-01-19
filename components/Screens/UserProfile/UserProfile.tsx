import { ReactElement, useContext, useState } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import CancelIcon from '@mui/icons-material/Cancel';
import PetsIcon from '@mui/icons-material/Pets';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import axios from 'axios';

import { InProgressDogInfoCard } from '../../InProgressDogInfoCard/InProgressDogInfoCard';
import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import { Notification } from '../../Notification/Notification';
import { UserInfoCard } from '../../UserInfoCard/UserInfoCard';
import { DogInfoCard } from '../../DogInfoCard/DogInfoCard';
import UserContext from '../../../context/user.context';
import { User } from '../../../entities/user.entities';
import * as S from './UserProfile.styles';
import { Loader } from '../../LineLoader/LineLoader';

export const UserProfile = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { user, setUser, isLoading } = useContext(UserContext);

  const checkDogProfiles = (status: RegistrationStatus): boolean => {
    const result =
      user?.dogs !== undefined &&
      user?.dogs.length > 0 &&
      user.dogs.filter((dog) => dog.registrationStatus === status).length > 0;

    return result;
  };

  const hasCompletedProfiles = checkDogProfiles(RegistrationStatus.COMPLETED);

  const hasInProgressProfiles = checkDogProfiles(
    RegistrationStatus.IN_PROGRESS
  );

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
          setSuccessMessage(`${dogName} profile is deleted successfully.`);
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(
            `Fail to delete ${dogName} profile. Please try again`
          );
          console.error('An error occurred:', error);
        });
    } else {
      setIsSubmitting(false);
      setErrorMessage('Oops! Something went wrong. Please try again.');
      console.error('dogId or user is undefined');
    }
  };

  return (
    <>
      {!isLoading && user ? (
        <S.ProfileContainer>
          <Card
            isInteractive={false}
            isPadded={true}
            ariaLabel='Dog Profile Card'
            margin={['xl', 'none']}
          >
            <S.Wrapper>
              <S.CloseButton
                onClick={() => router.push(`/main?userId=${user?.id}`)}
                aria-label='Dog profile close'
              >
                <CancelIcon fontSize='large' />
              </S.CloseButton>

              <UserInfoCard user={user} />

              <Box margin={'1rem auto'} tabIndex={0}>
                <Typography
                  variant='textL'
                  fontWeight='bold'
                  margin={['xl', 'none', 'md', 'none']}
                >
                  Dog Profiles
                </Typography>
              </Box>

              <Typography
                variant='textM'
                fontWeight='bold'
                margin={['none', 'none', 'md', 'none']}
              >
                <span tabIndex={0}>Completed</span>
              </Typography>
              {user && user.dogs !== undefined && user?.dogs.length > 0 ? (
                user?.dogs.map((dog) => {
                  return dog.registrationStatus ===
                    RegistrationStatus.COMPLETED ? (
                    <DogInfoCard
                      dog={dog}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                    />
                  ) : (
                    !hasCompletedProfiles && (
                      //TODO: Replace with Badge component once Storybook is updated
                      <Typography variant='textS'>- None</Typography>
                    )
                  );
                })
              ) : (
                <>
                  {/* TODO: Replace with Badge component once Storybook is updated */}
                  <Typography variant='textS'>- None</Typography>
                  <Button
                    size='xs'
                    variant='outlined'
                    textColor='black'
                    ariaLabel='Create dog profile button'
                    margin={['md', 'none', 'none']}
                    onClick={() => router.push('/questionnaires/name')}
                  >
                    Create Dog Profile&nbsp;&nbsp;
                    <PetsIcon fontSize='medium' />
                  </Button>
                </>
              )}

              <Typography
                variant='textM'
                fontWeight='bold'
                margin={['xl', 'none', 'md', 'none']}
              >
                <span tabIndex={0}>In Progress</span>
              </Typography>
              {user &&
                user.dogs !== undefined &&
                user?.dogs.length > 0 &&
                user?.dogs.map((dog) => {
                  return (
                    dog.registrationStatus ===
                      RegistrationStatus.IN_PROGRESS && (
                      <InProgressDogInfoCard
                        dog={dog}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                      />
                    )
                  );
                })}
              {/* TODO: Replace with Badge component once Storybook is updated */}
              {!hasInProgressProfiles && (
                <Typography variant='textS'>- None</Typography>
              )}
            </S.Wrapper>
          </Card>
          {errorMessage && (
            <Notification message={errorMessage} variant='error' />
          )}
          {successMessage && (
            <Notification message={successMessage} variant='success' />
          )}
        </S.ProfileContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};
