import {
  KeyboardEvent,
  ReactElement,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import * as yup from 'yup';
import { Button } from 'sk-storybook';

import * as S from './AvartarSelectionForm.styled';
import { dogAvatars } from './Avatars';
import { Box } from '@mui/material';

interface SelectedAvatar {
  name: string;
  src: string;
}

export const AvatarSelectionForm = (): ReactElement => {
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar>({
    name: '',
    src: '',
  });
  const [highlightIndex, setHighlightIndex] = useState<number>();

  const handleSubmit = (event: SyntheticEvent) => {
    //TODO: Implement logic for onSubmit
    event.stopPropagation();
    event.preventDefault();
    console.log(selectedAvatar);
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
