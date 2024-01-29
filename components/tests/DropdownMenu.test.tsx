import { NextRouter } from 'next/router';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { createUser } from './factories/user/createUser.factory';
import DropdownMenu, { DropdownItem } from '../DropdownMenu/DropdownMenu';

jest.mock(
  'next/image',
  () =>
    function Image({ src, alt }: { src: string; alt: string }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

const user = createUser();

const mockItems: DropdownItem[] = [
  {
    avatarPath: user.photoUrl,
    avatarName: 'login',
    label: user.firstName,
    url: '/user/profile',
  },
  {
    avatarPath: '/images/others/location.jpeg',
    avatarName: 'location',
    label: 'Update Location',
    url: `/dog/${user.dogs?.[0]?.id}/edit/location`,
  },
  {
    avatarPath: user.dogs?.[0]?.avatar.src ?? '',
    avatarName: user.dogs?.[0]?.avatar.name ?? '',
    label: user.dogs?.[0]?.name ?? '',
    url: `/dog/${user.dogs?.[0]?.id}`,
  },
  {
    avatarPath: '/images/others/logout.png',
    avatarName: 'logout',
    label: 'Logout',
    url: '/auth/signout',
  },
];

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

describe('DropdownMenu', () => {
  beforeEach(() => {
    cleanup();
  });

  it('opens dropdown menu', () => {
    render(<DropdownMenu items={mockItems} />);

    // Open dropdown menu
    const profileButton = screen.getByLabelText('User Profile Menu');
    fireEvent.click(profileButton);

    const firstName = screen.getByText(user.firstName);
    expect(firstName).toBeInTheDocument();
  });

  it('closes the dropdown menu', () => {
    render(<DropdownMenu items={mockItems} />);

    // Open dropdown menu
    const profileButton = screen.getByLabelText('User Profile Menu');
    fireEvent.click(profileButton);

    // Close dropdown menu
    const firstName = screen.getByText(user.firstName);
    fireEvent.click(profileButton);
    expect(firstName).not.toBeInTheDocument();
  });

  it('user profile has correct url', () => {
    render(<DropdownMenu items={mockItems} />);

    // Open dropdown menu
    const profileButton = screen.getByLabelText('User Profile Menu');
    fireEvent.click(profileButton);

    // Check if user profile link is in the document
    const userProfile = screen.getByText(user.firstName);
    expect(userProfile).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    const userProfileLink = links.find(
      (link) => link.getAttribute('href') === '/user/profile'
    );
    expect(userProfileLink).toBeDefined();
  });

  it('renders the image with the correct src', () => {
    render(<DropdownMenu items={mockItems} />);

    // Open dropdown menu
    const profileButton = screen.getByLabelText('User Profile Menu');
    fireEvent.click(profileButton);

    const image = screen.getByAltText('login');
    expect(image).toHaveAttribute('src', user.photoUrl);
  });

  it('renders the typography with the correct text', () => {
    render(<DropdownMenu items={mockItems} />);

    // Open dropdown menu
    const profileButton = screen.getByLabelText('User Profile Menu');
    fireEvent.click(profileButton);

    const menuItemText = screen.getByText(user.firstName);
    expect(menuItemText).toBeInTheDocument();
  });
});
