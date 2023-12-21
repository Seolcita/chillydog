import Image from 'next/image';
import { ReactElement, useRef } from 'react';
import * as S from './Avatars.styled';

const dogsArray = [
  'borderCollie',
  'corgi',
  'golden',
  'husky',
  'jack',
  'pitBull',
];

export const dogAvatars = dogsArray.map((dog) => {
  const scaleImg = dog === 'corgi' || dog === 'husky' ? 1.5 : 1.8;

  return {
    name: dog,
    img: (
      <Image
        src={`/images/avatars/${dog}.png`}
        width={80}
        height={80}
        alt={`${dog} avatar`}
        style={{ borderRadius: '10rem', transform: `scale(${scaleImg})` }}
        priority={true}
        draggable={false}
      />
    ),
  };
});
