import { ReactElement } from 'react';
import { NextRouter } from 'next/router';
import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { Questionnaire } from '../../Questionnaire/Questionnaire';
import { createDog } from '../factories/dog/createDog.factory';

const dog = createDog();

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
  pathname: '/edit/location',
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

describe('Questionnaire', () => {
  it('renders the Loader component when isLoading is true', () => {
    renderWithRouter(
      <Questionnaire
        currentStep={5}
        question={`Which city is your dog living?`}
        form={<div />}
        isLoading={true}
      />
    );

    expect(screen.getByLabelText('loading')).toBeInTheDocument();
  });

  it('renders the ProgressBar component when currentStep is defined and edit is false', () => {
    renderWithRouter(
      <Questionnaire
        currentStep={5}
        question={`Which city is your dog living?`}
        form={<div />}
        isLoading={false}
      />
    );

    expect(screen.getByLabelText('progress bar')).toBeInTheDocument();
  });

  it('should not render the ProgressBar component when edit is true', () => {
    renderWithRouter(
      <Questionnaire
        edit
        dogId={dog.id}
        question='Is your dog Northern breed or has your dog heavy coat?'
        isLoading={false}
        form={<div />}
      />
    );

    expect(screen.queryByLabelText('progress bar')).not.toBeInTheDocument();
  });
});
