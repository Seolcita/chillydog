import { ReactElement } from 'react';
import { ImageStepsProgressBar } from 'sk-storybook';
import Image from 'next/image';

import * as S from './ProgressBar.styles';

const poopImage = (
  <Image
    src='/images/progressBar/poop.png'
    width={40}
    height={40}
    alt='previous step image'
    style={{ marginBottom: '-2rem' }}
  />
);

const dogImage = (
  <Image
    src='/images/progressBar/dog.png'
    width={60}
    height={60}
    alt='current step image'
    style={{ margin: '0 1rem' }}
  />
);

const cookieImage = (
  <Image
    src='/images/progressBar/cookie.png'
    width={25}
    height={25}
    alt='next step image'
    style={{ margin: '0 1rem', transform: 'rotate(-40deg)' }}
  />
);

type ProgressBarProps = {
  totalSteps: number;
  currentStep: number;
};

export const ProgressBar = ({
  totalSteps,
  currentStep,
}: ProgressBarProps): ReactElement => {
  return (
    <S.Container>
      <ImageStepsProgressBar
        prevImg={poopImage}
        currentImg={dogImage}
        nextImg={cookieImage}
        totalSteps={totalSteps}
        currentStep={currentStep}
      />
    </S.Container>
  );
};
