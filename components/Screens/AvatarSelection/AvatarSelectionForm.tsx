/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { KeyboardEvent, ReactElement, useEffect, useState } from 'react';
import { Button, Spinner } from 'sk-storybook';

import * as S from './AvartarSelectionForm.styled';
import { ImagePlaceholder } from '../../ImagePlaceholder/ImagePlaceholder';

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

const dogsArray = [
  'borderCollie',
  'corgi',
  'golden',
  'husky',
  'jack',
  'pitBull',
];

export const AvatarSelectionForm = ({
  handleSubmit,
  setValue,
  value,
  isSubmitting,
}: AvatarSelectionFormProps): ReactElement => {
  const [highlightIndex, setHighlightIndex] = useState<number>();
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (loadedImagesCount === dogsArray.length) {
      setAllImagesLoaded(true);
    }
  }, [loadedImagesCount]);

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
        {dogsArray.map((avatarName, index) => {
          const scaleImg =
            avatarName === 'corgi' || avatarName === 'husky' ? 1.5 : 1.8;
          return (
            <S.AvatarsButton
              tabIndex={0}
              key={avatarName}
              onClick={(event) => {
                event.stopPropagation();
                setValue({
                  name: avatarName,
                  src: `/images/avatars/${avatarName}.png`,
                });
                setHighlightIndex(index);
              }}
              onKeyDown={(event) => handleKeyDown(event, avatarName, index)}
              role='button'
              aria-label={`${avatarName} avatar`}
            >
              <S.AvatarBox $highlighted={index === highlightIndex}>
                {!allImagesLoaded && (
                  <ImagePlaceholder width={8} height={8} borderRadius={50} />
                )}
                <img
                  src={`/images/avatars/${avatarName}.png`}
                  width={80}
                  height={80}
                  alt={`${avatarName} avatar`}
                  style={{
                    borderRadius: '10rem',
                    transform: `scale(${scaleImg})`,
                    display: allImagesLoaded ? 'block' : 'none',
                  }}
                  draggable={false}
                  onLoad={() => handleImageLoad()}
                />
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
