import Link from 'next/link';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { Button } from 'sk-storybook';

import DropdownMenu, { DropdownItem } from '../DropdownMenu/DropdownMenu';
import UserContext from '../../context/user.context';
import { RegistrationStatus } from '../../entities/questionnaire.entities';
import { CreateDogProfileButton } from '../CreateDogProfileButton/CreateDogProfileButton';
import * as S from './NavigationBar.styles';

export const NavigationBar = (): ReactElement => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user !== null;

  const dropdownItems: DropdownItem[] = [];
  if (isLoggedIn) {
    const userProfile = {
      avatarPath: user.photoUrl,
      avatarName: 'login',
      label: user.firstName,
      url: '/user/profile',
    };
    dropdownItems.push(userProfile);

    if (user.dogs !== undefined && user.dogs.length > 0) {
      const userLocation = {
        avatarPath: '/images/others/location.jpeg',
        avatarName: 'location',
        label: 'Update Location',
        url: `/dog/${user.dogs[0].id}/edit/location`,
      };
      dropdownItems.push(userLocation);
    }

    if (user.dogs !== undefined && user.dogs.length > 0) {
      const dogsDropdownItems: DropdownItem[] = user.dogs
        .filter(
          (dog) => dog.registrationStatus === RegistrationStatus.COMPLETED
        )
        .map((dog) => ({
          avatarPath: dog.avatar.src,
          avatarName: dog.avatar.name,
          label: dog.name,
          url: `/dog/${dog.id}`,
        }));
      dropdownItems.push(...dogsDropdownItems);
    }

    const logout = {
      avatarPath: '/images/others/logout.png',
      avatarName: 'logout',
      label: 'Logout',
      url: '/auth/signout',
    };
    dropdownItems.push(logout);
  }

  return (
    <nav>
      {isLoggedIn && (
        <S.IconsContainer>
          <CreateDogProfileButton />
          <DropdownMenu items={dropdownItems} />
        </S.IconsContainer>
      )}
    </nav>
  );
};
