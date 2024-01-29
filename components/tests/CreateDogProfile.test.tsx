import { NextRouter } from 'next/router';
import { fireEvent, render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { CreateDogProfile } from '../CreateDogProfileCard/CreateDogProfileCard';

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

jest.mock('lottie-react', () => {
  return {
    __esModule: true,
    default: () => <div>Lottie Animation</div>,
  };
});

describe('CreateDogProfile', () => {
  it('navigates to the questionnaire page when the button is clicked', () => {
    const { getByLabelText } = render(
      <RouterContext.Provider value={mockRouter as NextRouter}>
        <CreateDogProfile />
      </RouterContext.Provider>
    );

    const button = getByLabelText('Create Dog Profile');
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith('/questionnaires/name');
  });
});
