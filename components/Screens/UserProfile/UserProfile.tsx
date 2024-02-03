import { ReactElement, useContext, useState } from 'react';
import { Button, Card, Chip, Modal, Typography } from 'sk-storybook';
import PetsIcon from '@mui/icons-material/Pets';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import axios from 'axios';

import { InProgressDogInfoCard } from '../../InProgressDogInfoCard/InProgressDogInfoCard';
import { RegistrationStatus } from '../../../entities/questionnaire.entities';
import { DeviceType, useWindowSize } from '../../../hooks/use-window-resize';
import { Notification } from '../../Notification/Notification';
import { UserInfoCard } from '../../UserInfoCard/UserInfoCard';
import { DogInfoCard } from '../../DogInfoCard/DogInfoCard';
import { CloseButton } from '../../CloseButton/CloseButton';
import UserContext from '../../../context/user.context';
import { User } from '../../../entities/user.entities';
import { Loader } from '../../LineLoader/LineLoader';
import * as S from './UserProfile.styles';
import * as s from '../../common-styles';

export interface ModalProps {
  dogName: string;
  dogId: string;
  event: React.SyntheticEvent;
}

export const UserProfile = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dogName, setDogName] = useState<string>();
  const [dogId, setDogId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { user, setUser, isLoading, setIsHidden } = useContext(UserContext);
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;

  const checkDogProfiles = (status: RegistrationStatus): boolean => {
    const result =
      user?.dogs !== undefined &&
      user?.dogs.length > 0 &&
      user.dogs.filter((dog) => dog.registrationStatus === status).length > 0;

    return result;
  };

  const hasDogs = user?.dogs !== undefined && user?.dogs.length > 0;
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
        .delete(`${process.env.END_POINT_URL}/dog/delete`, {
          data: { dogId, userId: user.id },
        })
        .then((res) => {
          setIsSubmitting(false);
          setIsOpen(false);
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

  const handleModal = ({ dogName, dogId, event }: ModalProps) => {
    event.preventDefault();
    setDogName(dogName);
    setDogId(dogId);
    setIsOpen(true);
  };

  return (
    <Box>
      {!isLoading && user ? (
        <S.ProfileContainer>
          <Card
            isPadded
            isInteractive={false}
            hasBoxShadow={false}
            ariaLabel='Dog Profile Card'
            margin={['xl', 'none']}
            maxWidth={34}
          >
            <S.Wrapper>
              <CloseButton
                redirectUrl={`/main?userId=${user?.id}`}
                ariaLabel='User profile close'
              />

              <UserInfoCard user={user} />

              <Box margin={'1rem auto'} tabIndex={0}>
                <Typography
                  variant='textL'
                  fontWeight='bold'
                  margin={['xl', 'none', 'md', 'none']}
                >
                  - Dog Profiles -
                </Typography>
              </Box>

              <Typography
                variant='textS'
                fontWeight='bold'
                margin={['none', 'none', 'md', 'none']}
              >
                <span tabIndex={0}>Completed</span>
              </Typography>
              {user &&
                user.dogs !== undefined &&
                user?.dogs.length > 0 &&
                user?.dogs.map((dog) => {
                  return (
                    dog.registrationStatus === RegistrationStatus.COMPLETED && (
                      <DogInfoCard
                        dog={dog}
                        handleModal={handleModal}
                        isSubmitting={isSubmitting}
                        key={dog.id}
                      />
                    )
                  );
                })}

              {(!hasDogs || !hasCompletedProfiles) && (
                <Box
                  display='inline-block'
                  marginTop={'0.2rem'}
                  marginBottom={'0.4rem'}
                >
                  <Chip title='None' />
                </Box>
              )}

              {!hasDogs && (
                <Button
                  size='xs'
                  variant='outlined'
                  textColor='black'
                  ariaLabel='Create dog profile button'
                  margin={['md', 'none', 'none']}
                  onClick={() => {
                    setIsHidden(true);
                    router.push('/questionnaires/name');
                  }}
                >
                  Create Dog Profile&nbsp;&nbsp;
                  <PetsIcon fontSize='medium' />
                </Button>
              )}

              <Typography
                variant='textS'
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
                        handleModal={handleModal}
                        isSubmitting={isSubmitting}
                        key={dog.id}
                      />
                    )
                  );
                })}
              {!hasInProgressProfiles && (
                <Box display='inline-block' marginTop={'0.2rem'}>
                  <Chip title='None' />
                </Box>
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

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          ariaLabel={`Delete ${dogName} profile modal`}
          width={isMobile ? 30 : 40}
        >
          <S.ModalContent>
            <Typography variant='textL' fontWeight='bold'>
              Are you sure you want to <s.Span>delete</s.Span> {dogName}
              {`'s `}
              profile?
            </Typography>
            <S.ButtonContainer>
              <Button
                size='s'
                onClick={(event) =>
                  dogId && dogName && handleSubmit(event, dogId, dogName)
                }
                ariaLabel={`${dogName} profile delete`}
                textColor='white'
                bgColor='black'
                fullWidth
              >
                Delete
              </Button>
              <Button
                size='s'
                onClick={() => setIsOpen(false)}
                ariaLabel={`${dogName} profile delete`}
                textColor='black'
                bgColor='white'
                fullWidth
                variant='outlined'
              >
                Cancel
              </Button>
            </S.ButtonContainer>
          </S.ModalContent>
        </Modal>
      )}
    </Box>
  );
};
