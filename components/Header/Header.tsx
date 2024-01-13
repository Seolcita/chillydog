import Link from 'next/link';
import { ReactElement } from 'react';

import { Logo } from '../Logo/Logo';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import * as S from './Header.style';
import { CreateDogProfileButton } from '../CreateDogProfileButton/CreateDogProfileButton';

export const Header = (): ReactElement => {
  return (
    <S.Header>
      <Link href='/'>
        <Logo />
      </Link>
      <S.IconsContainer>
        <CreateDogProfileButton />
        <NavigationBar />
      </S.IconsContainer>
    </S.Header>
  );
};
