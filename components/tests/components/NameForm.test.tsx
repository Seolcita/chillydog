import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NameForm } from '../../Screens/Name/NameForm';

describe('NameForm', () => {
  const props = {
    onSubmit: jest.fn(),
    initialValueName: 'Cookie',
  };

  it('renders the initialValueName in the input field', () => {
    render(<NameForm {...props} />);

    expect(screen.getByLabelText('Name')).toHaveValue(props.initialValueName);
  });

  it('displays an error message when the validation fails', async () => {
    const props = {
      onSubmit: jest.fn(),
      initialValueName: 'T',
    };

    render(<NameForm {...props} />);

    const input = screen.getByLabelText('Name');
    userEvent.clear(input);
    userEvent.type(input, 'T');
    fireEvent.submit(input);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('should Continue button is disabled when error exists', async () => {
    const props = {
      onSubmit: jest.fn(),
    };

    render(<NameForm {...props} />);

    const input = screen.getByLabelText('Name');
    userEvent.clear(input);
    userEvent.type(input, 'T');
    fireEvent.submit(input);

    expect(screen.getByLabelText('Dog name submit button')).toBeDisabled();
  });
});
