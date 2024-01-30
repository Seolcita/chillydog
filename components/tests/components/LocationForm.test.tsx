import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { LocationForm } from '../../Screens/Location/LocationForm';

describe('LocationForm', () => {
  const props = {
    onSubmit: jest.fn(),
    initialValueName: 'Calgary',
  };

  it('renders the initialValueName in the input field', () => {
    render(
      <LocationForm
        onSubmit={props.onSubmit}
        initialValueLocation={props.initialValueName}
      />
    );

    expect(screen.getByRole('input')).toHaveValue(props.initialValueName);
  });

  it('displays an error message when the validation fails', async () => {
    const props = {
      onSubmit: jest.fn(),
      initialValueName: 'T',
    };

    render(<LocationForm {...props} />);

    const input = screen.getByRole('input');
    userEvent.clear(input);
    userEvent.type(input, 'T');
    fireEvent.submit(input);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('should Continue button is disabled when error exists', async () => {
    const props = {
      onSubmit: jest.fn(),
    };

    render(<LocationForm {...props} />);

    const input = screen.getByRole('input');
    userEvent.clear(input);
    userEvent.type(input, 'Not valid city name');
    fireEvent.submit(input);

    expect(
      screen.getByLabelText('city where dog lives submit button')
    ).toBeDisabled();
  });
});
