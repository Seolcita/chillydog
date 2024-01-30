import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DogSizeForm } from '../../Screens/DogSize/DogSizeForm';
import { DogSize } from '../../../entities/dog.entities';

describe('DogSizeForm', () => {
  const props = {
    handleSubmit: jest.fn(),
    setValue: jest.fn(),
    value: { label: 'Small', value: DogSize.SMALL },
    isSubmitting: false,
  };

  it('calls handleSubmit with the correct event when submitted', async () => {
    render(
      <DogSizeForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={props.value}
        isSubmitting={props.isSubmitting}
      />
    );

    // Click the dropdown
    userEvent.click(screen.getByLabelText('Select an option'));

    // Select an option from the dropdown
    await userEvent.click(screen.getByLabelText('MEDIUM'));

    // Click the submit button
    fireEvent.click(screen.getByLabelText('Dog size submit button'));

    // Wait for any asynchronous actions to complete
    await waitFor(() => {
      expect(props.handleSubmit).toHaveBeenCalled();
    });
  });

  it('should disabled Continue button when isSubmitting is true', async () => {
    render(
      <DogSizeForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={undefined}
        isSubmitting={false}
      />
    );

    // Click the dropdown
    userEvent.click(screen.getByLabelText('Dog size submit button'));

    expect(screen.getByLabelText('Dog size submit button')).toBeDisabled();
  });

  it('should disabled Continue button when value is undefined', async () => {
    render(
      <DogSizeForm
        handleSubmit={props.handleSubmit}
        setValue={props.setValue}
        value={props.value}
        isSubmitting={true}
      />
    );

    expect(screen.getByLabelText('Dog size submit button')).toBeDisabled();
  });
});
