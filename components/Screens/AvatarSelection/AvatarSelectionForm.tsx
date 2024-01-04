/* eslint-disable react-hooks/rules-of-hooks */
import {
  KeyboardEvent,
  ReactElement,
  SyntheticEvent,
  useContext,
  useRef,
  useState,
} from 'react';
import * as yup from 'yup';
import { Button } from 'sk-storybook';

import * as S from './AvartarSelectionForm.styled';
import { dogAvatars } from './Avatars';
import { Box } from '@mui/material';
import UserContext from '../../../context/user.context';
import { useQuestionnaireNextScreenURL } from '../../../hooks/use-questionnaire-next-screen-url';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dog } from '../../../entities/dog.entities';

export interface SelectedAvatar {
  name: string;
  src: string;
}

export const AvatarSelectionForm = (): ReactElement => {
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: '',
    src: '',
  });
  const [highlightIndex, setHighlightIndex] = useState<number>();
  const userContext = useContext(UserContext);
  const router = useRouter();
  const dogId = router.query.dogId;

  const handleSubmit = async (event: SyntheticEvent) => {
    //TODO: Implement logic for onSubmit
    event.stopPropagation();
    event.preventDefault();
    console.log(selectedAvatar);

    try {
      if (
        userContext.user &&
        selectedAvatar.name !== '' &&
        selectedAvatar.src !== ''
      ) {
        await axios
          .post('http://localhost:3001/api/dog/avatar-selection', {
            dogId,
            selectedAvatar,
            userId: userContext.user.id,
          })
          .then((res) => {
            const dog: Dog = res.data;
            const nextScreenUrl = useQuestionnaireNextScreenURL(dog);
            router.push(nextScreenUrl);
          })
          .catch((error) => {
            console.error('An error occurred:', error); //TODO: Handle error - Toast message
          });
      } else {
        console.log('no user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // TODO: Handle error - Toast message
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    avatarName: string,
    index: number
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        break;
      case 'ArrowUp':
        event.preventDefault();
        break;
      case 'Enter':
        setSelectedAvatar({
          name: avatarName,
          src: `/images/avatars/${avatarName}.png`,
        });
        setHighlightIndex(index);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <S.AvatarsContainer>
        {dogAvatars.map((avatar, index) => {
          return (
            <S.AvatarsButton
              tabIndex={0}
              key={avatar.name}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedAvatar({
                  name: avatar.name,
                  src: `/images/avatars/${avatar.name}.png`,
                });
                setHighlightIndex(index);
                console.log(avatar.name);
              }}
              onKeyDown={(event) => handleKeyDown(event, avatar.name, index)}
              role='button'
              aria-label={`${avatar.name} avatar`}
            >
              <S.AvatarBox $highlighted={index === highlightIndex}>
                {avatar.img}
              </S.AvatarBox>
            </S.AvatarsButton>
          );
        })}
      </S.AvatarsContainer>
      <Button
        ariaLabel={`${selectedAvatar.name} avatar is selected. Selected avatar submit button`}
        size='s'
        bgColor='black'
        textColor='white'
        hasShadow={false}
        fullWidth
        margin={['xl', 'none', 'sm']}
      >
        Next
      </Button>
    </form>
  );
};
