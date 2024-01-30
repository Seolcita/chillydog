import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { render, fireEvent, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { CloseButton } from '../../CloseButton/CloseButton';

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

describe('CloseButton', () => {
  it('redirects when close button is clicked', () => {
    const redirectUrl = '/main?userId=userId1234';
    const ariaLabel = 'User profile close';

    renderWithRouter(
      <CloseButton redirectUrl={redirectUrl} ariaLabel={ariaLabel} />
    );
    const closeButton = screen.getByLabelText(ariaLabel);
    fireEvent.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith(redirectUrl);
  });
});
