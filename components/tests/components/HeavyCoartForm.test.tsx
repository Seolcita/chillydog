import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { HeavyCoatForm } from '../../Screens/HeavyCoat/HeavyCoatForm';

describe('HeavyCoatForm', () => {
  const props = {
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    value: { label: 'Yes', value: true },
    isSubmitting: false,
  };

  it('calls handleSubmit with the correct event when submitted', async () => {
    render(
      <HeavyCoatForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={props.value}
        isSubmitting={props.isSubmitting}
      />
    );

    // Click the dropdown
    userEvent.click(screen.getByLabelText('Select an option'));

    // Select an option from the dropdown
    await userEvent.click(screen.getByLabelText('true'));

    // Click the submit button
    fireEvent.click(screen.getByLabelText('Dog coat type submit button'));

    // Wait for any asynchronous actions to complete
    await waitFor(() => {
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });

  it('should disabled Continue button when isSubmitting is true', async () => {
    render(
      <HeavyCoatForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={undefined}
        isSubmitting={false}
      />
    );

    // Click the dropdown
    userEvent.click(screen.getByLabelText('Select an option'));

    expect(screen.getByLabelText('Dog coat type submit button')).toBeDisabled();
  });

  it('should disabled Continue button when value is undefined', async () => {
    render(
      <HeavyCoatForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={props.value}
        isSubmitting={true}
      />
    );

    expect(screen.getByLabelText('Dog coat type submit button')).toBeDisabled();
  });
});
