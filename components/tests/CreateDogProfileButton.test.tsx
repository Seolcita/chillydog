import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { CreateDogProfileButton } from '../CreateDogProfileButton/CreateDogProfileButton';

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

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

describe('CreateDogProfileButton', () => {
  it('navigates to the questionnaire name page on click', () => {
    renderWithRouter(<CreateDogProfileButton />);

    const addButton = screen.getByLabelText('Create a dog profile');
    fireEvent.click(addButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/questionnaires/name');
  });
});
