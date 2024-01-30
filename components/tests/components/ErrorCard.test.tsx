import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { ErrorCard } from '../../ErrorCard/ErrorCard';
import { createUser } from '../factories/user/createUser.factory';

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

jest.mock('lottie-react', () => {
  return jest.fn(() => <div>Lottie Animation</div>);
});

function renderWithRouter(ui: ReactElement) {
  return {
    ...render(
      <RouterContext.Provider value={mockRouter as NextRouter}>
        {ui}
      </RouterContext.Provider>
    ),
    mockRouter,
  };
}

const user = createUser();

describe('ErrorCard', () => {
  it('renders the message and button text', () => {
    renderWithRouter(
      <ErrorCard
        redirectUrl='/main'
        message='Something went wrong!'
        buttonText='Go to main Page'
      />
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls router.push with the redirectUrl when the button is clicked', () => {
    renderWithRouter(
      <ErrorCard
        redirectUrl={`/main?userId=${user.id}`}
        message='Something went wrong!'
        buttonText='Go to main Page'
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockRouter.push).toHaveBeenCalledWith(`/main?userId=${user.id}`);
  });
});
