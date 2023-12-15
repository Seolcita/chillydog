import Link from 'next/link';
import { ReactElement } from 'react';
import { Logo } from '../Logo/Logo';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import * as S from './Header.style';

export const Header = (): ReactElement => {
  return (
    <S.Header>
      <Link href='/'>
        <Logo />
      </Link>
      <NavigationBar />
    </S.Header>
  );
};
