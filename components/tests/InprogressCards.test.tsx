import { render, screen, fireEvent } from '@testing-library/react';
import { NextRouter, useRouter } from 'next/router';
import { InprogressCards } from '../InprogressCards/InprogressCards';
import { createDog } from './factories/dog/createDog.factory';
import { DeviceType } from '../../hooks/use-window-resize';
import {
  QuestionnaireScreenName,
  RegistrationStatus,
} from '../../entities/questionnaire.entities';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { ReactElement } from 'react';
import { QuestionnaireScreenMap } from '../../hooks/use-questionnaire-next-screen-url';

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

const dog = createDog({
  completedStep: 3,
  registrationStatus: RegistrationStatus.IN_PROGRESS,
  nextScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
});

describe('InprogressCards', () => {
  it('renders the cards for dogs with registration status IN_PROGRESS', () => {
    renderWithRouter(
      <InprogressCards dogs={[dog]} deviceType={DeviceType.DESKTOP} />
    );

    expect(screen.getByText(dog.name)).toBeInTheDocument();
  });

  it('calls router.push with the correct URL when the Complete Profile button is clicked', () => {
    renderWithRouter(
      <InprogressCards dogs={[dog]} deviceType={DeviceType.DESKTOP} />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockRouter.push).toHaveBeenCalledWith(
      `/questionnaires/cold-adapt?dogId=${dog.id}`
    );
  });
});
