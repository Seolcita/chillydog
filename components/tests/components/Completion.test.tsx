import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { User } from '../../../entities/user.entities';
import UserContext from '../../../context/user.context';
import Completion from '../../../pages/questionnaires/completion';
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

jest.mock('lottie-react', () => {
  return jest.fn(() => <div>Lottie Animation</div>);
});

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

describe('Completion', () => {
  it('calls router.push with the correct argument when the button is clicked', () => {
    renderWithContexts({ ui: <Completion /> });

    fireEvent.click(screen.getByLabelText('Go to main page button'));
    expect(mockRouter.push).toHaveBeenCalledWith(`/main?userId=${user.id}`);
  });
});
