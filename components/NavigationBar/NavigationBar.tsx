import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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
      url: '/api/auth/signout',
    },
  ];

  const { data: session, status: sessionStatus } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, [sessionStatus]);

  return (
    <nav>
      {isLoggedIn ? (
        <DropdownMenu items={dropdownItems} menuLabel='Menu' />
      ) : (
        <Link href='/auth/signin'>
          <Button
            size='s'
            textColor='white'
            bgColor='primary'
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
