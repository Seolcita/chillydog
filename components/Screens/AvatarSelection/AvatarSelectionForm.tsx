/* eslint-disable react-hooks/rules-of-hooks */
import { KeyboardEvent, ReactElement, useState } from 'react';
import { Button, Spinner } from 'sk-storybook';

import * as S from './AvartarSelectionForm.styled';
import { dogAvatars } from './Avatars';

interface AvatarSelectionFormProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  setValue: React.Dispatch<React.SetStateAction<SelectedAvatar>>;
  value: SelectedAvatar;
  isSubmitting: boolean;
}
export interface SelectedAvatar {
  name: string;
  src: string;
}

export const AvatarSelectionForm = ({
  handleSubmit,
  setValue,
  value,
  isSubmitting,
}: AvatarSelectionFormProps): ReactElement => {
  const [highlightIndex, setHighlightIndex] = useState<number>();

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
        setValue({
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
                setValue({
                  name: avatar.name,
                  src: `/images/avatars/${avatar.name}.png`,
                });
                setHighlightIndex(index);
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
        ariaLabel={`${value.name} avatar is selected. Selected avatar submit button`}
        size='s'
        bgColor='black'
        textColor='white'
        hasShadow={false}
        disabled={isSubmitting || !value.name}
        fullWidth
        margin={['xl', 'none', 'none', 'none']}
      >
        {isSubmitting ? <Spinner size='xs' /> : 'Continue'}
      </Button>
    </form>
  );
};
