import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { fireEvent, render, screen } from '@testing-library/react';

import { DogInfoCard } from '../../DogInfoCard/DogInfoCard';
import { createDog } from '../factories/dog/createDog.factory';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

jest.mock(
  'next/image',
  () =>
    function Image({ src, alt }: { src: string; alt: string }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

// Mock the dependencies'
jest.mock('@mui/icons-material/SourceOutlined', () => 'SourceOutlinedIcon');
jest.mock('@mui/icons-material/DeleteForever', () => 'DeleteForeverIcon');
jest.mock('sk-storybook', () => ({
  Card: 'Card',
  Spinner: 'Spinner',
  Typography: 'Typography',
}));

const mockHandleModal = jest.fn();
const mockDog = createDog();
const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
};

beforeEach(() => {
  mockRouter.push = jest.fn();
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

describe('DogInfoCard', () => {
  it('push to correctly url when user click dog profile button', () => {
    renderWithRouter(
      <DogInfoCard
        dog={mockDog}
        isSubmitting={false}
        handleModal={mockHandleModal}
      />
    );

    const profileButton = screen.getByLabelText(`${mockDog.name} profile`);
    fireEvent.click(profileButton);

    expect(mockRouter.push).toHaveBeenCalledWith(`/dog/${mockDog.id}`);
  });

  it('handleModal called with correct dog information when user click delete dog profile button', () => {
    renderWithRouter(
      <DogInfoCard
        dog={mockDog}
        isSubmitting={false}
        handleModal={mockHandleModal}
      />
    );

    const deleteButton = screen.getByLabelText(
      `Delete ${mockDog.name} profile`
    );
    fireEvent.click(deleteButton);

    expect(mockHandleModal).toHaveBeenCalledWith({
      dogId: mockDog.id,
      dogName: mockDog.name,
      event: expect.anything(),
    });
  });
});
