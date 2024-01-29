import { render, screen } from '@testing-library/react';
import ResultCard from '../ResultCard/ResultCard';
import { DeviceType } from '../../hooks/use-window-resize';

describe('ResultCard', () => {
  const props = {
    name: 'Dog Name',
    result: {
      title: 'Dangerous weather developing',
      description: 'Use cation',
      point: 4,
    },
    avatarName: 'golden',
    deviceType: DeviceType.DESKTOP,
  };
  it('renders the name, result title, and result description', () => {
    render(<ResultCard {...props} />);

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.result.title)).toBeInTheDocument();
    expect(screen.getByText(props.result.description)).toBeInTheDocument();
  });
});
