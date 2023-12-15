import Link from 'next/link';
import { ReactElement } from 'react';
import { Logo } from '../Logo/Logo';
import { Button } from 'sk-storybook';
import DropdownMenu, { DropdownItem } from '../DropdownMenu/DropdownMenu';

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
      url: '/logout',
    },
  ];

  const isLoggedIn = true;

  return (
    <nav>
      {isLoggedIn ? (
        <DropdownMenu items={dropdownItems} menuLabel='Menu' />
      ) : (
        <Link href='/login'>
          <Button size='s' textColor='white' ariaLabel='login button'>
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
};
