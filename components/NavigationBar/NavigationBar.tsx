import Link from 'next/link';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { Button } from 'sk-storybook';

import DropdownMenu, { DropdownItem } from '../DropdownMenu/DropdownMenu';
import UserContext from '../../context/user.context';

export const NavigationBar = (): ReactElement => {
  // TODO: Replaced it with data from backend
  const dropdownItems: DropdownItem[] = [
    {
      avatarPath: '/images/logo/logo.png',
      label: 'Seol',
      url: '/my-profile',
    },
    {
      avatarPath: '/images/logo/logo.png',
      label: 'Cookie',
      url: '/cookie',
    },
    {
      avatarPath: '/images/logo/logo.png',
      label: 'Add dog',
      url: '/add-dog',
    },
    {
      avatarPath: '/images/logo/logo.png',
      label: 'Logout',
      url: '/api/auth/signout',
    },
  ];

  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.user !== null;

  return (
    <nav>
      {isLoggedIn ? (
        <DropdownMenu items={dropdownItems} menuLabel='Menu' />
      ) : (
        <Link href='/auth/signin'>
          <Button
            size='s'
            textColor='black'
            bgColor='white'
            ariaLabel='login button'
            hasShadow={false}
          >
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
};
