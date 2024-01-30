import { NextRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { User } from '../../../entities/user.entities';
import UserContext from '../../../context/user.context';
import { NavigationBar } from '../../NavigationBar/NavigationBar';
import { createUser } from '../factories/user/createUser.factory';

interface RenderWithContext {
  ui: ReactElement;
  userData?: User | null;
  loggedIn?: boolean;
}

const user = createUser();

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

function renderWithContexts({
  ui,
  userData = user,
  loggedIn = true,
}: RenderWithContext) {
  return {
    ...render(
      <UserContext.Provider
        value={{
          user: userData,
          isLoading: false,
          setUser: () => {},
          isAuthenticated: loggedIn,
          refreshUser: () => {},
        }}
      >
        <RouterContext.Provider value={mockRouter as NextRouter}>
          {ui}
        </RouterContext.Provider>
      </UserContext.Provider>
    ),
    mockRouter,
  };
}

describe('NavigationBar', () => {
  it('renders the Create Dog Profile Button when the user is logged in', () => {
    renderWithContexts({ ui: <NavigationBar /> });

    const createDogProfileButton = screen.getByLabelText(
      'Create a dog profile'
    );

    expect(createDogProfileButton).toBeInTheDocument();
  });

  it('renders Dropdown Menu when the user is logged in', () => {
    renderWithContexts({ ui: <NavigationBar /> });

    const dropdownMenuButton = screen.getByLabelText('User Profile Menu');

    expect(dropdownMenuButton).toBeInTheDocument();
  });

  it('should not render the Create Dog Profile Button when the user is not logged in', () => {
    renderWithContexts({
      ui: <NavigationBar />,
      userData: null,
      loggedIn: false,
    });

    const createDogProfileButton = screen.queryByLabelText(
      'Create a dog profile'
    );

    expect(createDogProfileButton).not.toBeInTheDocument();
  });

  it('should not render Dropdown Menu when the user is not logged in', () => {
    renderWithContexts({
      ui: <NavigationBar />,
      userData: null,
      loggedIn: false,
    });

    const dropdownMenuButton = screen.queryByLabelText('User Profile Menu');

    expect(dropdownMenuButton).not.toBeInTheDocument();
  });
});
